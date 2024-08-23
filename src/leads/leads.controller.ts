import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async createLead(@Body() createLeadDto: CreateLeadDto) {
    try {
      return await this.leadsService.createLead(createLeadDto);
    } catch (error) {
      throw new BadRequestException('Failed to create lead.');
    }
  }

  @Get()
  async findAllLeads() {
    return this.leadsService.findAllLeads();
  }

  @Get(':id')
  async findOneLead(@Param('id') id: string) {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format.');
    }
    const lead = await this.leadsService.findOneLead(idNumber);
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${idNumber} not found.`);
    }
    return lead;
  }

  @Patch(':id')
  async updateLead(
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ) {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format.');
    }
    try {
      return await this.leadsService.updateLead(idNumber, updateLeadDto);
    } catch (error) {
      throw new BadRequestException('Failed to update lead.');
    }
  }

  @Delete(':id')
  async deleteLead(@Param('id') id: string) {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format.');
    }
    try {
      return await this.leadsService.deleteLead(idNumber);
    } catch (error) {
      throw new BadRequestException('Failed to delete lead.');
    }
  }
}
