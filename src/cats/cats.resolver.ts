import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatInput } from './inputs/cat.input';

@Resolver()
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CreateCatDto])
  async cats() {
    return this.catsService.findAll();
  }

  @Query(() => CreateCatDto)
  async cat(@Args('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Mutation(() => CreateCatDto)
  async createCat(@Args('input') input: CatInput) {
    return this.catsService.create(input);
  }

  @Mutation(() => CreateCatDto)
  async deleteCat(@Args('id') id: string) {
    return this.catsService.delete(id);
  }

  @Mutation(() => CreateCatDto)
  async updateCat(
    @Args('id') id: string,
    @Args('newAge') newAge: number,
    @Args('newName') newName: string,
    @Args('newBreed') newBreed: string,
  ) {
    return this.catsService.update(id, newAge, newName, newBreed);
  }
}
