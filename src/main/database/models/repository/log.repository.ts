import { EntityRepository, Repository } from 'typeorm';
import Log from '../log.model';

@EntityRepository(Log)
export class LogRepository extends Repository<Log> {}
