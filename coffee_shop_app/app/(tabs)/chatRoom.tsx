import { Alert, TouchableOpacity, View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MessageList from '@/components/MessageList';
import { MessageInterface } from '@/types/types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { callChatBotAPI, wakeUpAPI } from '@/services/chatBot'; // ← ADD wakeUpAPI
import { useCart } from '@/components/CartContext';
import PageHeader from '@/components/pageHeader';

const ChatRoom = () => {
  const { addToCart, emptyCart } = useCart();

  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isWarmingUp, setIsWarmingUp] = useState<boolean>(true); // ← ADD THIS
  const textRef = useRef('');
  const inputRef = useRef<TextInput>(null);

  // ← ADD THIS: Wake up API when component mounts
  useEffect(() => {
    const warmUpServer = async () => {
      await wakeUpAPI();
      setIsWarmingUp(false);
    };
    warmUpServer();
  }, []);

  useEffect(() => {
    // Your existing useEffect logic
  }, [messages]);

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;

    try {
      // Add the user message to the list of messages
      let InputMessages = [...messages, { content: message, role: 'user' }];

      setMessages(InputMessages);
      textRef.current = '';
      if (inputRef) inputRef?.current?.clear();
      setIsTyping(true);

      let responseMessage = await callChatBotAPI(InputMessages);

      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, responseMessage]);

      if (responseMessage) {
        if (responseMessage.memory) {
          if (responseMessage.memory.order) {
            emptyCart();
            responseMessage.memory.order.forEach((item: any) => {
              addToCart(item.item, item.quantity);
            });
          }
        }
      }
    } catch (err: any) {
      setIsTyping(false);
      console.error('Error in handleSendMessage:', err);
      Alert.alert('Error', err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" />

      <View className="flex-1 bg-white">
        <PageHeader title="Chat Bot" showHeaderRight={false} bgColor="white" />

        <View className="h-3 border-b border-neutral-300" />

        {/* ← ADD THIS: Warming up indicator */}
        {isWarmingUp && (
          <View className="bg-yellow-100 px-4 py-2 border-b border-yellow-300">
            <Text className="text-yellow-800 text-center" style={{ fontSize: hp(1.8) }}>
              🔥 Warming up chatbot server... This takes a few seconds.
            </Text>
          </View>
        )}

        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList messages={messages} isTyping={isTyping} />
          </View>

          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row mx-3 justify-between border p-2 mb-2 bg-white border-neutral-300 rounded-full pl-5">
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type message..."
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
                editable={!isTyping} // ← ADD THIS: Disable input while typing
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                className="bg-neutral-200 p-2 mr-[1px] rounded-full"
                disabled={isTyping} // ← ADD THIS: Disable button while typing
              >
                <Feather name="send" size={hp(2.7)} color={isTyping ? '#a3a3a3' : '#737373'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default ChatRoom;
