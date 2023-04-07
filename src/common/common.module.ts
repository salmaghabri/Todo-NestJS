import { Global, Module } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

const provider = {
    useValue: uuidv4(),
    provide: 'UUID',
};
@Global()
@Module({
    providers: [provider],
    exports: [provider]})
export class CommonModule {}
