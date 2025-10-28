import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Product } from '@/types/types';
import OrdersHeader from './OrdersHeader';
import OrdersFooter from './OrdersFooter';

interface ProductListProps {
    products: Product[];
    quantities: { [key: string]: number };
    setQuantities: (itemKey: string, delta: number) => void;
    totalPrice: number;
  }
  

const ProductList: React.FC<ProductListProps> = ({ products, quantities, setQuantities,totalPrice }) => {

  const uniqueProducts = products.filter((product, index, self) => 
    index === self.findIndex((p) => p.name === product.name)
  )

  const filteredProducts = products.filter((product) => (quantities[product.name] || 0) > 0 )

  const renderItem = ({item}: {item: Product}) => (
    <View
      className='flex-row item-center justify-between mx-7 pb-3'
    >
        <Image 
          source={{uri: item.image_url}}
          className='w-16 h-16 rounded-lg'
        />
        <View className='flex-1 ml-4'>
          <Text
            className='text-lg font-[Sora-SemiBold] text-[#242424]'
          >{item.name}</Text>
        
        <Text
          className='font-[Sora-Regular] text-gray-500 text-xs'
        >{item.category}</Text>
      </View>

      <View
        className='flex-row item-center'
      >
        <TouchableOpacity
          onPress={() => setQuantities(item.name, -1)}
        >
          <Text className='text-xl'>-</Text>
        </TouchableOpacity>

        <Text className='mx-3 mt-1'>{quantities[item.name] || 0}</Text>

        <TouchableOpacity
          onPress={() => setQuantities(item.name, 1)}
        >
          <Text className='text-xl'>+</Text>
        </TouchableOpacity>

      </View>

    </View>
  )

  return (
    <View>
      {filteredProducts.length > 0 ? (
        <FlatList 
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          ListHeaderComponent={<OrdersHeader />}
          ListFooterComponent={<OrdersFooter totalPrice={totalPrice}/>}
        />
      ): (
        <View
          className='mx-7 items-center'
        >
          <Text
            className='text-2xl font-[Sora-SemiBold] text-gray-500 mv-4 text-center'
          >No items in your cart yet</Text>
          <Text
            className='text-xl font-[Sora-SemiBold] text-gray-500 mv-4 text-center'
          >Let's Go Get some Delicious Goodies</Text>
        </View>
      ) }
    </View>
  )
}

export default ProductList