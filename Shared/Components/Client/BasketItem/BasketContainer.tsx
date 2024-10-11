// import styles from "../../../../pages/user/basket/basket.module.css";
// import BasketSvg from "../../../../public/basketicon.png";
// import BasketItem from "./index";
// import React, {useEffect, useState} from "react";
// // import EmptyBasket from '../EmptyBasket/index'
// import {clearBasket, deleteBasket, GetBasket, getCategories} from "../../../../Services/index";
// import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
// import {useSelector} from "react-redux";
// import {RootState} from "../../../Redux/Store/store";
// import {useRouter} from "next/router";
// import RemoveSvg from "../../../../public/delete.png";
// import {BasketPostDataType} from "../../../Interface/index";
// import {useToast} from "@chakra-ui/react";
// // import {useTranslation} from "next-i18next";

// type BasketProps = {
//     productCount?: number;
//     data_list?: string[],
//     size: string
// }

// export default function BasketContainer(props: BasketProps) {
//     let {size} = props
//     let {push}=useRouter()
//     const [userLoaded, setUserLoaded] = useState(false);
//     // const { t } = useTranslation("common");
//     const { data: basketList, isLoading: basketLoading } = useQuery({
//         queryKey: ["basket"],
//         queryFn: GetBasket,
//         enabled: userLoaded,
//     });
//     let basket_list = basketList?.data.result.data;
//     const user = useSelector((state: RootState) => state.user);
//     const toast = useToast()
//     const queryClient = useQueryClient();
    
//    const mutationClear = useMutation<BasketPostDataType, Error, BasketPostDataType>(
//     (basketProduct: BasketPostDataType) => clearBasket(basketProduct),
//     {
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['basket'] });
//             toast({
//                 title: `Product deleted successfully!`,
//                 status: 'success',
//                 duration: 2000,
//                 isClosable: true,
//                 position: 'top-right',
//                 variant: 'subtle'
//             });
//         },
//         onError: (error:any) => {
//             console.error("Error deleting basket:", error);
//             toast({
//                 title: `Error deleting basket: ${error}`,
//                 status: 'error',
//                 duration: 2000,
//                 isClosable: true,
//                 position: 'top-right',
//                 variant: 'subtle'
//             });
//         }
//     }
// );

//     function handleClear(){
//         const basketId = {
//             user_id: user.id,
//             basket_id: basket_list?.id
//         }
//         mutationClear.mutate(basketId);
//     }
//     useEffect(() => {
//         if (user.id) {
//             setUserLoaded(true);
//         }
//     }, [user.id]);

//     return (
//         <>
//             {/*{basketLoading?*/}
//             {/*    <Loading/>:*/}
//                 <div className={`${styles.user_cabinet_box} ${styles[size]}`}>
//                     {basket_list?.items.length>0?
//                         <>
//                             <div className="min-h-[550px] flex justify-between flex-col">
//                                 <div>
//                                     <h2 className={styles.user_cabinet_title}>
//                                    your basket
//                                     </h2>
//                                     <div className="flex justify-between items-center mb-5">
//                                         <div className={styles.item_counts}>
//                                             <BasketSvg/> <span>{basket_list?.items.length}items</span>
//                                         </div>
//                                         <button onClick={handleClear} className={`lightRed gap-2 flex items-center capitalize ${styles.clear_btn}`}><RemoveSvg/>{t("clear all")}</button>
//                                     </div>

//                                     <div className={styles.basket_list}>
//                                         {basket_list?.items?.map((product:any) => (
//                                             <BasketItem  total_count={basket_list.total_count} basket_id={basket_list.id} total_amount={basket_list.total_amount}  key={product.id}  {...product} />
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <button className={styles.checkout_btn} onClick={()=>push('/user/checkout')}>
//                                 <span>
//                                     {t("Checkout")}
//                                 </span>
//                                     <p>
//                                         &#8380; {basket_list.total_amount}
//                                     </p>
//                                 </button>
//                             </div>
//                         </> :
//                         <EmptyBasket/>
//                     }
//                 </div>
//             {/*}*/}

//         </>
//     )
// }


