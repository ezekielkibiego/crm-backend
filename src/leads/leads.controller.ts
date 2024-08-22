import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.createLead(createLeadDto);
  }

  @Get()
  findAll() {
    return this.leadsService.findAllLeads();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.leadsService.findOneLead(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.updateLead(id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.leadsService.deleteLead(id);
  }
}
