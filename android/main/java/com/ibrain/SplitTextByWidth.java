package com.ibrain;

import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;

/**
 * Created by shirley on 16/10/14.
 */

public class SplitTextByWidth extends ReactContextBaseJavaModule {

    private static final String TAG = "SplitTextByWidth";

    private final String KEY_FONT = "font";

    private final String KEY_FONT_SIZE = "fontSize";

    private final String KEY_WIDTH = "width";

    private final String KEY_HEIGHT = "height";

    public SplitTextByWidth(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "splitTextByWidth";
    }


    @ReactMethod
    public void processString(String text, ReadableMap textConfig, ReadableMap textMax, Callback callback) {
        // splitText.processString(
        //      '1213你你你a',
        //      {font:'Heiti SC',fontSize:14},
        //      {width:28,height:50},
        //      (error,textList)=>{
        //          console.log(textList)
        //      })

        Paint paint = new Paint();
        Rect rect = new Rect();
        String font = textConfig.getString(KEY_FONT);
        int fontSize = textConfig.getInt(KEY_FONT_SIZE);
        int textWidth = textMax.getInt(KEY_WIDTH);
        ArrayList result = new ArrayList();

        paint.setTextSize(fontSize);
        paint.setTypeface(Typeface.create(font ,Typeface.NORMAL));

        int start = 0;
//        "abc",subString(0, 1);   "a"
        for (int i = 1; i<= text.length(); i++) {
            String subString = text.substring(start, i+1);
            paint.getTextBounds(subString, 0, subString.length(), rect);
            if (rect.width() > textWidth) {
                subString = text.substring(0, i);
                result.add(subString);
                start = i;
            } else {
                if (i == text.length()) {
                    subString = text.substring(start, i+1);
                    result.add(subString);
                }
            }
        }

        Log.d(TAG, "result=" + result.toString());
        if (callback != null) {
            callback.invoke(result);
        }
    }
}
