import { Resolver, Query, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('search', { type: () => String }) search: string) {
    return this.categoryService.findOne(search);
  }
}
