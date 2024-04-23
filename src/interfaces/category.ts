export interface Category {
   name: string
}
export type RootState = {
   categories: {
     data: Category[]
   }
 }