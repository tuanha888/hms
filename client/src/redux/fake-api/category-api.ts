import { PostCategory } from "../features/postCategorySlice"


export const getCategoriesAPI = () : PostCategory[] => {
    return [
        {
            id: "6e906ca5-cfb9-4ca1-bc92-97398c65ad78",
            name: "Bệnh tiểu đường"
        },
        {
            id: "18fb1c9f-ea02-4a11-986c-15b3085428c8",
            name: "Bệnh tiêu hóa"
        }, 
        {
            id: "5bc3f41c-6f0f-4b82-84e0-17f35d00b7b6",
            name: "Bệnh tim mạch"
        }
    ]
}