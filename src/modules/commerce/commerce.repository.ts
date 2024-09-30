import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Commerce } from './entities/commerce.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CommerceRepository {

    constructor (
          @InjectRepository(Commerce) private commerceRepository: Repository<Commerce>) {}

    async getCommerces (): Promise<Commerce[]> {
        return await this.commerceRepository.find()
    }

    async getCommerceByUserId (userId: string): Promise<Commerce[]> {
      return await this.commerceRepository.find({where: {userId}})
    }

    async getCommerceById (id: string): Promise<Commerce> {
      return await this.commerceRepository.findOne({where: {id}})
    }

    async createCommerce(user: Partial<Commerce>): Promise<Commerce> {
      return await this.commerceRepository.save(user);
    }

    async updateCommerce(id: string, user: Partial<Commerce>): Promise<UpdateResult> {
      return await this.commerceRepository.update(id, user);
    }

    async deleteCommerce(id: string): Promise<DeleteResult> {
      return await this.commerceRepository.delete(id);
    }

    async unsubscribeCommerce(id: string): Promise<UpdateResult> {
      return await this.commerceRepository.update(id, {endDate:new Date()});
    }

}