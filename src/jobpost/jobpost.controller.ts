import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { JobPostService } from './jobpost.service';
import { CreateJobPostDto } from './dto/create-jobpost.dto';
import { UpdateJobPostDto } from './dto/update-jobpost.dto';
import { JobPost } from './entities/jobpost.entity';

@Controller('job-posts')
export class JobPostController {
  constructor(private readonly jobPostService: JobPostService) {}

  @Post()
  create(@Body() createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    return this.jobPostService.create(createJobPostDto);
  }

  @Get()
  findAll(
    @Query('isActive') isActive?: boolean,
    @Query('company') company?: string,
    @Query('location') location?: string,
    @Query('jobType') jobType?: string,
  ): Promise<JobPost[]> {
    const filters = { isActive, company, location, jobType };
    return this.jobPostService.findAll(filters);
  }

  @Get('search')
  search(@Query('keyword') keyword: string): Promise<JobPost[]> {
    return this.jobPostService.searchJobs(keyword);
  }

  @Get('expiring')
  getExpiringJobs(): Promise<JobPost[]> {
    return this.jobPostService.getExpiringJobs();
  }

  @Get('recent')
  getRecentJobs(): Promise<JobPost[]> {
    return this.jobPostService.getRecentJobs();
  }

  @Get('salary-range')
  getJobsBySalaryRange(
    @Query('min') minSalary: number,
    @Query('max') maxSalary: number,
  ): Promise<JobPost[]> {
    return this.jobPostService.getJobsBySalaryRange(minSalary, maxSalary);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<JobPost> {
    return this.jobPostService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobPostDto: UpdateJobPostDto,
  ): Promise<JobPost> {
    return this.jobPostService.update(id, updateJobPostDto);
  }

  @Put(':id/toggle-status')
  toggleStatus(@Param('id') id: string): Promise<JobPost> {
    return this.jobPostService.toggleStatus(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.jobPostService.remove(id);
  }
}
export default JobPostController;
