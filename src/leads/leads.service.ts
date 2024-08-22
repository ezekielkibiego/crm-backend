import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  // Create a new lead
  async createLead(data: CreateLeadDto) {
    try {
      return await this.prisma.lead.create({
        data,
      });
    } catch (error) {
      console.error('Error creating lead:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'A lead with this email already exists.',
          );
        }
      }
      throw new BadRequestException('Failed to create lead.');
    }
  }

  // Find all leads
  async findAllLeads() {
    try {
      return await this.prisma.lead.findMany();
    } catch (error) {
      console.error('Error retrieving leads:', error);
      throw new BadRequestException('Failed to retrieve leads.');
    }
  }

  // Find a lead by ID
  async findOneLead(id: number) {
    try {
      const lead = await this.prisma.lead.findUnique({
        where: { id },
      });
      if (!lead) {
        throw new NotFoundException(`Lead with ID ${id} not found.`);
      }
      return lead;
    } catch (error) {
      console.error('Error finding lead:', error);
      throw new BadRequestException(`Failed to find lead with ID ${id}.`);
    }
  }

  // Update a lead by ID
  async updateLead(id: number, data: UpdateLeadDto) {
    try {
      const lead = await this.prisma.lead.update({
        where: { id },
        data,
      });
      if (!lead) {
        throw new NotFoundException(`Lead with ID ${id} not found.`);
      }
      return lead;
    } catch (error) {
      console.error('Error updating lead:', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Lead with ID ${id} not found.`);
      }
      throw new BadRequestException(`Failed to update lead with ID ${id}.`);
    }
  }

  // Delete a lead by ID
  async deleteLead(id: number) {
    try {
      await this.prisma.lead.delete({
        where: { id },
      });
      return { message: `Lead with ID ${id} successfully deleted.` };
    } catch (error) {
      console.error('Error deleting lead:', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Lead with ID ${id} not found.`);
      }
      throw new BadRequestException(`Failed to delete lead with ID ${id}.`);
    }
  }
}
