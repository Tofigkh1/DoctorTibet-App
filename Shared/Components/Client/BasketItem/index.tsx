// import styles from "../../../../pages/user/basket/basket.module.css";
// import RemoveSvg from "../svg/RemoveSvg";
// import React from "react";
// import PlusSvg from '../svg/PlusSvg'
// import MinusSvg from '../svg/MinusSvg'
// import {AddBasket, deleteBasket} from "../../../services";
// import {useMutation, useQueryClient} from "react-query";
// import {useSelector} from "react-redux";
// import {RootState} from "../../../redux/store";
// import {BasketPostDataType} from "../../../interfaces";
// import {useToast} from "@chakra-ui/react";

// type BasketState = {
//     id: string,
//     product_id:string,
//     name: string,
//     price: string,
//     count: number,
//     img_url:string,
//     basket_id:string
// }

// interface IUser{
//     id:string|number|any;

// }

// export default function BasketItem(product: BasketState) {
//     let {name, id, price,img_url, count,basket_id} = product;
//     const user = useSelector((state: RootState) => state.user);
//     const queryClient = useQueryClient();
//     const toast = useToast()
//     const mutationClear = useMutation(
//         (basketProduct: BasketPostDataType) => deleteBasket(basketProduct),
//         {
//             onSuccess: () => {
//                 queryClient.invalidateQueries('basket');
//                 // toast.success("Product deleted successfully!", {
//                 //     autoClose: 1000,
//                 // });
//                 toast({
//                     title: `Product deleted successfully!`,
//                     status: 'success',
//                     duration: 2000,
//                     isClosable: true,
//                     position:'top-right',
//                     variant:'subtle'
//                 })
//             },
//             onError: (error) => {
//                 console.error("Error deleting product:", error);
//                 // toast.error("Error deleting product count", {
//                 //     autoClose: 1000,
//                 // });
//                 toast({
//                     title: `Error deleting basket: ${error}`,
//                     status: 'error',
//                     duration: 2000,
//                     isClosable: true,
//                     position:'top-right',
//                     variant:'subtle'
//                 })
//             },
//         }
//     );
    
//     const mutation = useMutation((basketProduct: BasketPostDataType) => AddBasket(basketProduct),
//         {
//             onSuccess: () => {
//                 queryClient.invalidateQueries('basket');
//                 // toast.success("Product added to the basket successfully!", {
//                 //     autoClose: 1000,
//                 // });
//                 toast({
//                     title: `Product added to the basket successfully!`,
//                     status: 'success',
//                     duration: 2000,
//                     isClosable: true,
//                     position:'top-right',
//                     variant:'subtle'
//                 })
//             },
//             onError: (error) => {
//                 console.error("Error adding product to the basket:", error);
//                 // toast.error("Error adding product to the basket", {
//                 //     autoClose: 1000,
//                 // });
//                 toast({
//                     title: `Error adding product to the basket`,
//                     status: 'error',
//                     duration: 2000,
//                     isClosable: true,
//                     position:'top-right',
//                     variant:'subtle'
//                 })
//             },
//         }
//     );
//     const handleAddToBasket = () => {
//         const basketProduct: BasketPostDataType = {
//             user_id: user?.id,
//             product_id: product.id,
//         };
//         if(user){
//             mutation.mutate(basketProduct);
//         }
//         if(!user){
//         }

//     };
//     async function  handleRemove(){
//         const basketId: BasketPostDataType = {
//             user_id: user?.id,
//             basket_id: basket_id,
//             product_id: id,
//         };
//         mutationClear.mutate(basketId);
//     }

//     return (
//         <>
//             <div className={styles.basket_box} key={id}>
//                 <div className={styles.basket_item}>
//                     <img src={img_url} alt={'title'}/>
//                     <div className={styles.basket_text}>
//                         <h4>
//                             {name}
//                         </h4>
//                         <p>
//                             {price} ₼
//                         </p>
//                     </div>
//                 </div>
//                 <div className={styles.basket_item}>
//                     <div className={styles.basket_quantity}>
//                         <button onClick={handleAddToBasket}><PlusSvg/>
//                         </button>
//                         <input type="number" value={count}/>
//                         <button onClick={handleRemove}><MinusSvg/></button>
//                     </div>
//                     <button onClick={handleRemove}><RemoveSvg/></button>
//                 </div>
//             </div>
//         </>
//     )
// }
