export interface IRecipe {
    likes: string[];
    recents: any[];
    _id: string;
    title: string;
    products: string;
    preparation: string;
    imageUrl: string;
    userId: {
      recipes: string[],
      recents: string[],
      _id: string;
      email: string;
      username: string;
      password: string;
      created_at: string;
      updatedAt: string;
      __v: number
    },
    created_at: string;
    updatedAt: string;
    __v: number
}