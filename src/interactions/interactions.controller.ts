import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post()
  async create(@Body() createInteractionDto: CreateInteractionDto) {
    try {
      return await this.interactionsService.createInteraction(
        createInteractionDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.interactionsService.findAllInteractions();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Change id type to string
    try {
      return await this.interactionsService.findOneInteraction(parseInt(id)); // Convert id to number
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInteractionDto: UpdateInteractionDto,
  ) {
    // Change id type to string
    try {
      return await this.interactionsService.updateInteraction(
        parseInt(id),
        updateInteractionDto,
      ); // Convert id to number
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Change id type to string
    try {
      return await this.interactionsService.deleteInteraction(parseInt(id)); // Convert id to number
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
