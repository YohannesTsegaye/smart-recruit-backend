import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from './entities/jobpost.entity';
import { CreateJobPostDto } from './dto/create-jobpost.dto';
import { UpdateJobPostDto } from './dto/update-jobpost.dto';

@Injectable()
export class JobPostService {
  constructor(
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
  ) {}

  // Create a new job post
  async create(createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    console.log(createJobPostDto, 'createJobPostDto');
    const jobPost = this.jobPostRepository.create(createJobPostDto);
    return await this.jobPostRepository.save(jobPost);
  }

  // Get all job posts with optional filters
  async findAll(filters?: {
    isActive?: boolean;
    company?: string;
    location?: string;
    jobType?: string;
  }): Promise<JobPost[]> {
    const query = this.jobPostRepository.createQueryBuilder('jobPost');

    if (filters) {
      if (filters.isActive !== undefined) {
        query.andWhere('jobPost.isActive = :isActive', {
          isActive: filters.isActive,
        });
      }
      if (filters.company) {
        query.andWhere('jobPost.company ILIKE :company', {
          company: `%${filters.company}%`,
        });
      }
      if (filters.location) {
        query.andWhere('jobPost.location ILIKE :location', {
          location: `%${filters.location}%`,
        });
      }
      if (filters.jobType) {
        query.andWhere('jobPost.jobType = :jobType', {
          jobType: filters.jobType,
        });
      }
    }

    return await query.getMany();
  }

  // Get a specific job post by ID
  async findOne(id: string): Promise<JobPost> {
    const jobPost = await this.jobPostRepository.findOne({ where: { id } });
    if (!jobPost) {
      throw new NotFoundException(`Job post with ID ${id} not found`);
    }
    return jobPost;
  }

  // Update a job post
  async update(
    id: string,
    updateJobPostDto: UpdateJobPostDto,
  ): Promise<JobPost> {
    const jobPost = await this.findOne(id);
    Object.assign(jobPost, updateJobPostDto);
    return await this.jobPostRepository.save(jobPost);
  }

  // Delete a job post
  async remove(id: string): Promise<void> {
    const result = await this.jobPostRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job post with ID ${id} not found`);
    }
  }

  // Toggle job post status (active/inactive)
  async toggleStatus(id: string): Promise<JobPost> {
    const jobPost = await this.findOne(id);
    jobPost.isActive = !jobPost.isActive;
    return await this.jobPostRepository.save(jobPost);
  }

  // Search jobs by keyword in title or description
  async searchJobs(keyword: string): Promise<JobPost[]> {
    return await this.jobPostRepository
      .createQueryBuilder('jobPost')
      .where(
        'jobPost.title ILIKE :keyword OR jobPost.description ILIKE :keyword',
        {
          keyword: `%${keyword}%`,
        },
      )
      .getMany();
  }

  // Get jobs that are expiring soon (within next 7 days)
  async getExpiringJobs(): Promise<JobPost[]> {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    return await this.jobPostRepository
      .createQueryBuilder('jobPost')
      .where('jobPost.deadline <= :sevenDaysFromNow', { sevenDaysFromNow })
      .andWhere('jobPost.deadline > :now', { now: new Date() })
      .andWhere('jobPost.isActive = :isActive', { isActive: true })
      .getMany();
  }

  // Get recently posted jobs (posted within last 30 days)
  async getRecentJobs(): Promise<JobPost[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return await this.jobPostRepository
      .createQueryBuilder('jobPost')
      .where('jobPost.createdAt >= :thirtyDaysAgo', { thirtyDaysAgo })
      .andWhere('jobPost.isActive = :isActive', { isActive: true })
      .orderBy('jobPost.createdAt', 'DESC')
      .getMany();
  }

  // Get jobs by salary range
  async getJobsBySalaryRange(
    minSalary: number,
    maxSalary: number,
  ): Promise<JobPost[]> {
    return await this.jobPostRepository
      .createQueryBuilder('jobPost')
      .where('jobPost.salary BETWEEN :minSalary AND :maxSalary', {
        minSalary,
        maxSalary,
      })
      .andWhere('jobPost.isActive = :isActive', { isActive: true })
      .getMany();
  }
}
