import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return await this.customersService.createCustomer(createCustomerDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create customer',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.customersService.findAllCustomers();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve customers',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.customersService.findOneCustomer(id);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to find customer with ID ${id}`,
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    try {
      return await this.customersService.updateCustomer(id, updateCustomerDto);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to update customer with ID ${id}`,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.customersService.deleteCustomer(id);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete customer with ID ${id}`,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
