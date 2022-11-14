import { EntityRepository, Repository } from 'typeorm';
import { testEntity } from '../entities/test.Entity';

@EntityRepository(testEntity)
export class TestRepository extends Repository<testEntity> {}