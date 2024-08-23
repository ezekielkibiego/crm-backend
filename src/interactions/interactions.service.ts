import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  // Create a new interaction
  async createInteraction(data: CreateInteractionDto) {
    try {
      return await this.prisma.interaction.create({
        data: {
          type: data.type,
          description: data.description,
          leadId: data.leadId,
          customerId: data.customerId,
        },
      });
    } catch (error) {
      console.error('Error creating interaction:', error);
      throw new BadRequestException('Failed to create interaction.');
    }
  }

  // Find all interactions
  async findAllInteractions() {
    try {
      return await this.prisma.interaction.findMany();
    } catch (error) {
      console.error('Error fetching interactions:', error);
      throw new BadRequestException('Failed to fetch interactions.');
    }
  }

  // Find an interaction by ID
  async findOneInteraction(id: number) {
    try {
      const interaction = await this.prisma.interaction.findUnique({
        where: { id },
      });
      if (!interaction) {
        throw new NotFoundException(`Interaction with ID ${id} not found.`);
      }
      return interaction;
    } catch (error) {
      console.error('Error fetching interaction by ID:', error);
      throw new BadRequestException('Failed to fetch interaction.');
    }
  }

  // Update an interaction by ID
  async updateInteraction(id: number, data: UpdateInteractionDto) {
    try {
      const interaction = await this.prisma.interaction.update({
        where: { id },
        data: {
          type: data.type,
          description: data.description,
          leadId: data.leadId,
          customerId: data.customerId,
        },
      });
      return interaction;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Interaction with ID ${id} not found.`);
      }
      console.error('Error updating interaction:', error);
      throw new BadRequestException('Failed to update interaction.');
    }
  }

  // Delete an interaction by ID
  async deleteInteraction(id: number) {
    try {
      const interaction = await this.prisma.interaction.delete({
        where: { id },
      });
      return { message: 'Interaction successfully deleted.', interaction };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Interaction with ID ${id} not found.`);
      }
      console.error('Error deleting interaction:', error);
      throw new BadRequestException('Failed to delete interaction.');
    }
  }
}
