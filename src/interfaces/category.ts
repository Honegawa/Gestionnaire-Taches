export interface Category {
   id: number,
   name: string
}
export type RootState = {
   categories: {
     data: Category[]
   }
 }