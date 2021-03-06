import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { CatInput } from './inputs/cat.input';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CatInput): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return await this.catModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<Cat> {
    return await this.catModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    newAge: number,
    newName: string,
    newbreed: string,
  ): Promise<Cat> {
    const currRecord = await this.findOne(id);
    (await currRecord).age = newAge;
    (await currRecord).name = newName;
    (await currRecord).breed = newbreed;
    return await currRecord.save();
  }
}
