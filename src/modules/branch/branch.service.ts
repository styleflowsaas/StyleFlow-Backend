import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Branch } from './entities/branch.entity';
import { BranchRepository } from './branch.repository';

@Injectable()
export class BranchService {
    
  constructor (private readonly branchRepository: BranchRepository) {}

    async getBranches (): Promise<Branch[]> {
      return await this.branchRepository.getBranchs()
    }

    async getBranchById (id: string): Promise<Branch> {
      const branch = await this.branchRepository.getBranchById(id)
      if (!branch) throw new NotFoundException("Sucursal no encontrado")
      return branch;
    }

    async getBranchByCommerceId (commerceId: string): Promise<Branch[]> {
      return await this.branchRepository.getBranchByCommerceId(commerceId)
    }

    async getBranchByUserId (userId: string): Promise<Branch[]> {
      return await this.branchRepository.getBranchByUserId(userId)
    }

    async createBranch(commerce: Partial<Branch>): Promise<Branch> {
      const branchFind = await this.branchRepository.createBranch(commerce);
      if (!branchFind) throw new InternalServerErrorException("Error al intentar crear el Sucursal")
      return branchFind;
    }

    async updateBranch(id: string, branch: Partial<Branch>): Promise<string> {
      const branchUpdate = await this.branchRepository.updateBranch(id, branch);
      if (branchUpdate.affected === 0) throw new NotFoundException ("Sucursal a actualizar no encontrado")
      return id;
    }

    async deleteBranch(id: string): Promise<string> {
      const branchDelete = await this.branchRepository.deleteBranch(id);
      if (branchDelete.affected === 0) throw new NotFoundException ("Sucursal a eliminar no encontrado")
      return id;
    }

    async unsubscribeBranch(id: string): Promise<string> {
      const branchUpdate = await this.branchRepository.unsubscribeBranch(id);
      if (branchUpdate.affected === 0) throw new NotFoundException ("Sucursal a dar de baja no encontrado")
      return id;
    }
}