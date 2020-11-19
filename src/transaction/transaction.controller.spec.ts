import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionService } from './service/transaction.service';
import { TransactionController } from './transaction.controller';

describe('TransactionController', () => {
  let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([TransactionEntity])],
      controllers: [TransactionController],
      providers: [TransactionService]
    }).compile();
    controller = module.get<TransactionController>(TransactionController)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});