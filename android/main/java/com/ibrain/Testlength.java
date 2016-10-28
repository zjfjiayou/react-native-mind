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
import com.facebook.react.bridge.ReadableMapKeySetIterator;

/**
 * Created by shirley on 16/10/14.
 */

public class Testlength extends ReactContextBaseJavaModule {

    private static final String TAG = "Testlength";

    private final String KEY_FONT = "font";

    private final String KEY_FONT_SIZE = "fontSize";

    private final String KEY_WIDTH = "width";

    private final String KEY_HEIGHT = "height";

    public Testlength(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Testlength";
    }

    @ReactMethod
    public void processString(String text, ReadableMap textConfig, ReadableMap textMax, Callback callback) {

//        testLength.processString(node.data.text, {
//                font: 'Heiti SC',
//                fontSize: node.style.title.fontSize
//        }, {
//            width: 400,
//                    height: 50
//        },
//        (error, w, h) => {
//            node.titleBox.height = Number(h) + nodeStyle.paddingTop + nodeStyle.paddingBottom;
//            node.titleBox.width = Number(w) + nodeStyle.paddingLeft + nodeStyle.paddingRight;
//            resolve();
//        });
//    });
        Log.d(TAG, "text=" + text);
        if (text == null) {
            callback.invoke("NullPointerException");
            return;
        }
        Paint paint = new Paint();
        Rect rect = new Rect();
        String font = textConfig.getString(KEY_FONT);
        int fontSize = textConfig.getInt(KEY_FONT_SIZE);
        int textMaxWidth = textMax.getInt(KEY_WIDTH);
        int textMaxHeight = textMax.getInt(KEY_HEIGHT);

        paint.setTextSize(fontSize);
        paint.setTypeface(Typeface.create(font ,Typeface.NORMAL));
        Log.d(TAG, "paint=" + paint);
        paint.getTextBounds(text, 0, text.length(), rect);

        int width = rect.width();
        int height = rect.height();
        width = width < textMaxWidth ? width : textMaxWidth;
        height = height < textMaxHeight ? height : textMaxHeight;
        Log.d(TAG, "width=" + width + " , height=" + height);
        if (callback != null) {
            callback.invoke(null, width, height);
        }
    }
}
