import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, forwardRef, Inject } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from '../tasks/tasks.service';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    @Inject(forwardRef(() => TasksService)) private readonly tasksService: TasksService, // 🔹 injection forwardRef
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  // 🔹 Endpoint pour récupérer toutes les tâches d’un projet
  @Get(':projectId/tasks')
  async getTasks(@Param('projectId') projectId: string) {
    return this.tasksService.findAllByProject(projectId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
