import { Injectable, BadRequestException } from '@nestjs/common';
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
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          companyName: data.companyName,
          leadStatus: data.leadStatus,
          customerId: data.customerId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('A lead with this email already exists.');
      }
      throw new BadRequestException('Failed to create lead.');
    }
  }

  // Find all leads
  async findAllLeads() {
    return this.prisma.lead.findMany();
  }

  // Find a lead by ID
  async findOneLead(id: number) {
    return this.prisma.lead.findUnique({
      where: { id },
    });
  }

  // Update a lead by ID
  async updateLead(id: number, data: UpdateLeadDto) {
    try {
      return await this.prisma.lead.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException('Failed to update lead.');
    }
  }

  // Delete a lead by ID
  async deleteLead(id: number) {
    try {
      return await this.prisma.lead.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete lead.');
    }
  }
}
