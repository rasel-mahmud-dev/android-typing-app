package com.preact_android;

import android.content.Context;
import android.content.res.AssetManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

public class WebAppInterface {
    Context mContext;
    WebView myWebview;
    /** Instantiate the interface and set the context */
    WebAppInterface(Context c, WebView myWebview) {
        this.mContext = c;
        this.myWebview = myWebview;
    }


    /** Show a toast from the web page */
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }


    /** Show a toast from the web page */
    @JavascriptInterface
    public void handleError(String type) {
        if(Objects.equals(type, "copy-lessons")){
            /// simply copy lessons json file to data/data dir
            this.copyAssetsToDataDir();

        } else{

        }
    }


    @JavascriptInterface
    public void addLesson(String lessons) {
        FileOutputStream fos = null;
        try {

            AssetManager assetFiles = mContext.getAssets();
            InputStream stream = assetFiles.open("lessons.json");

            int i;
            char c;
            StringBuilder allData = new StringBuilder();

            while((i = stream.read()) != -1) {

                // converts integer to character
                c = (char)i;

                // prints character
                allData.append(c);
            }


            mContext.getAssets();


            fos = mContext.openFileOutput("lessons.json", Context.MODE_PRIVATE);
            fos.write(allData.toString().getBytes());
            fos.close();

            Toast.makeText(this.mContext, "lessons created", Toast.LENGTH_LONG).show();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
            Toast.makeText(this.mContext, "Error: "+ e, Toast.LENGTH_LONG).show();
        } catch (IOException e){
            Toast.makeText(this.mContext, "Error: "+ e, Toast.LENGTH_LONG).show();
        }
    }


    public void copyAssetsToDataDir() {
        /*
        * get all content from android assets/lessons.json file
        * and create a json file inside data/data path with same name
        * */

        try {

            // read file
            AssetManager assetFiles = mContext.getAssets();
            InputStream stream = assetFiles.open("lessons.json");
            int i;
            char c;
            StringBuilder allData = new StringBuilder();

            while((i = stream.read()) != -1) {
                // converts integer to character
                c = (char)i;
                // prints character
                allData.append(c);
            }

            stream.close();


            // write file
            FileOutputStream fos = null;
            fos = mContext.openFileOutput("lessons.json", Context.MODE_PRIVATE);
            fos.write(allData.toString().getBytes());
            fos.close();

            Toast.makeText(this.mContext, "lessons.json copy to data/data", Toast.LENGTH_LONG).show();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
            Toast.makeText(this.mContext, "Error: "+ e, Toast.LENGTH_LONG).show();
        } catch (IOException e){
            Toast.makeText(this.mContext, "Error: "+ e, Toast.LENGTH_LONG).show();
        }
    }



    @JavascriptInterface
    public String getData(String data) {
        try {
            InputStream inputStream = this.mContext.openFileInput("lessons.json");

            int result = inputStream.available();

            byte[] bytes = new byte[result];

            inputStream.read(bytes);
            inputStream.close();

            return new String(bytes);

        } catch (Exception e){
            Toast.makeText(this.mContext, "Exception: "+ e, Toast.LENGTH_LONG).show();
            return "";
        }
    }


    @JavascriptInterface
    public void reloadWebview(String data) {
        Context a = myWebview.getContext();
        myWebview.post(new Runnable() {
            @Override
            public void run() {
                myWebview.reload();
                System.out.println(this);
                Toast.makeText(a , data, Toast.LENGTH_LONG).show();
            }
        });
    }

//    @JavascriptInterface
//    public void createLesson(String lessons){
//    }


//    @JavascriptInterface
//    public void getLessons() {
//        System.out.println("get all lessons");
//
////        try {
////            InputStream inputStream = this.mContext.openFileInput("lessons.json");
////
////            int result = inputStream.available();
////
////            byte[] bytes = new byte[result];
////
////            inputStream.read(bytes);
////            inputStream.close();
////
////            String s = new String(bytes);
////            Toast.makeText(this.mContext, "fetch all lessons", Toast.LENGTH_LONG).show();
////
////        } catch (Exception e){
////            Toast.makeText(this.mContext, "Exception: "+ e, Toast.LENGTH_LONG).show();
////        }
//    }

//    @JavascriptInterface
//    public void callFromHtml(String data) {
//        Toast.makeText(this.mContext, data, Toast.LENGTH_LONG).show();
//    }


//    public  void readFile() {
//        try {
//            int p = R.raw.data;
//            File myObj = new File(String.valueOf(p));
//            Scanner myReader = new Scanner(myObj);
//            while (myReader.hasNextLine()) {
//                String data = myReader.nextLine();
//                System.out.println(data);
//            }
//            myReader.close();
//        } catch (FileNotFoundException e) {
//            System.out.println("An error occurred.");
//            e.printStackTrace();
//        }
//    }

}
