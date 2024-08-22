import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  // Create a new customer
  async createCustomer(data: CreateCustomerDto) {
    try {
      return await this.prisma.customer.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          companyName: data.companyName,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'A customer with this email already exists.',
        );
      }
      throw new BadRequestException('Failed to create customer.');
    }
  }

  // Find all customers
  async findAllCustomers() {
    try {
      return await this.prisma.customer.findMany();
    } catch (error) {
      throw new BadRequestException('Failed to retrieve customers.');
    }
  }

  // Find a customer by ID
  async findOneCustomer(id: number) {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id },
      });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      return customer;
    } catch (error) {
      throw new BadRequestException(`Failed to find customer with ID ${id}.`);
    }
  }

  // Update a customer by ID
  async updateCustomer(id: number, data: UpdateCustomerDto) {
    try {
      const customer = await this.prisma.customer.update({
        where: { id },
        data,
      });
      return customer;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      throw new BadRequestException(`Failed to update customer with ID ${id}.`);
    }
  }

  // Delete a customer by ID
  async deleteCustomer(id: number) {
    try {
      await this.prisma.customer.delete({
        where: { id },
      });
      return { message: `Customer with ID ${id} successfully deleted.` };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      throw new BadRequestException(`Failed to delete customer with ID ${id}.`);
    }
  }
}
