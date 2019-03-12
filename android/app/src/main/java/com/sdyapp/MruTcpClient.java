package com.sdyapp;


import android.support.annotation.NonNull;

import java.io.*;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;


public class MruTcpClient {

    public static String addZeroForNum(String str, int strLength) {
        int strLen = str.length();
        StringBuffer sb = null;
        while (strLen < strLength) {
            sb = new StringBuffer();
            sb.append("0").append(str);// 左补0
            // sb.append(str).append("0");//右补0
            str = sb.toString();
            strLen = str.length();
        }
        return str;
    }

    @NonNull
    public static String charsToDex(char[] chars) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < chars.length; i++) {

            char c = chars[i];
            String t = Integer.toHexString(c).toUpperCase();
            t = addZeroForNum(t, 2);
            sb.append("0x").append(t);
            if (i < chars.length - 1)
                sb.append(",");
        }
        return sb.toString();
    }

    @NonNull
    public static String bytesToDex(byte[] chars) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < chars.length; i++) {

            byte c = chars[i];
            String t = Integer.toHexString(c).toUpperCase();
            t = addZeroForNum(t, 2);
            sb.append("0x").append(t);
            if (i < chars.length - 1)
                sb.append(",");
        }
        return sb.toString();
    }

    /**
     * Socket客户端
     */
    public static void main(String[] args) {
//        while (true) {


        String host = "127.0.0.1";
//        String host = "go2b.cn";
        int port = 9999;
        getMruInfoFromHost(host, port);

    }


    private static void getMruInfoFromHost(String host, int port) {
        try {
            try {
                //创建Socket对象
                Socket socket = new Socket(host, port);

                //根据输入输出流和服务端连接
                OutputStream outputStream = socket.getOutputStream();//获取一个输出流，向服务端发送信息
                OutputStreamWriter out = new OutputStreamWriter(outputStream);
                out.write(new char[]{0x55, 0xAA, 0x55, 0x00, 0x25, 0x80, 0x03, 0xA8});
                out.flush();
                socket.shutdownOutput();//关闭输出流

                InputStream inputStream = socket.getInputStream();//获取一个输入流，接收服务端的信息
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);//包装成字符流，提高效率
//                    BufferedReader bufferedReader = new BufferedReader(inputStreamReader);//缓冲区
//                    String info = "";

                char[] buffers = new char[1024 * 10];
                byte[] bytesbuffer = new byte[1024 * 10];
                int r = -1;
                int br = -1;

                List<Byte> l = new LinkedList<Byte>();
                r = inputStreamReader.read(buffers);
                br=inputStream.read(bytesbuffer);

                char[] re = Arrays.copyOfRange(buffers, 0, r);
                byte[] bre = Arrays.copyOfRange(bytesbuffer, 0, br);

                String dex = charsToDex(re);
                String bdex = bytesToDex(bre);

                System.out.println(r);
                System.out.println(dex);

                System.out.println(br);
                System.out.println(bdex);

                List short_items = MruAnalyse.getMru(re);
                System.out.println(short_items);

                System.out.println(r);

                String clientMessage = new String(buffers, 0, r);
                System.out.println(clientMessage);
//                    while (socket != null && (r = inputStreamReader.read()) != -1) {
////                        inputStream.read(buffers,0,size);
////                        System.out.println(size);
//                        System.out.println(r);
//                        l.add(Byte.valueOf((byte) r));
//                    }


                //关闭相对应的资源

                outputStream.close();
                inputStream.close();
                out.close();

                socket.close();
            } catch (UnknownHostException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

//    }
}