import { v4 as uuidv4 } from 'uuid';
import { UUIDGenerator } from '@repo/uuid/UUIDGenerator';

export class UUIDGeneratorImpl implements UUIDGenerator {
  generate() {
    return uuidv4();
  }
}
