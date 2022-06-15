package com.preact_android;

import android.database.Cursor;
import android.graphics.Color;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;


public class MainActivity extends AppCompatActivity {

	WebView myWebview = null;
	DatabaseHelper myDb;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		myDb = new DatabaseHelper(this);
//
//		Window window = this.getWindow();
//		window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
//		window.setNavigationBarColor(Color.TRANSPARENT);
//////	window.setStatusBarColor(Color.green(500));
//		window.setFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS, WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
//
////	window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
////	window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
////	window.setStatusBarColor(this.getResources().getColor(R.color.transparent));
//

		hideSystemBars();
		setContentView(R.layout.activity_main);

		this.myWebview = (WebView) findViewById(R.id.webview);
		myWebview.addJavascriptInterface(new WebAppInterface(this), "Android");

		WebSettings webSettings = myWebview.getSettings();
		webSettings.setJavaScriptEnabled(true);
		webSettings.setDomStorageEnabled(true);

//        myWebView.setWebViewClient(new WebViewClient());
		myWebview.setWebChromeClient(new WebChromeClient());

//		sendAllLessons();

		List l = myDb.getLessonss();


		ObjectMapper om = new ObjectMapper();
		try {
			String data = om.writeValueAsString(l);

			myWebview.setWebViewClient(new WebViewClient() {
				public void onPageFinished(WebView view, String url) {
					//Here you want to use .loadUrl again
					//on the webview object and pass in
					//on the webview object and pass in
					//"javascript:<your javaScript function"
					System.out.println(data);
					myWebview.loadUrl("javascript:myJavaScriptFunc('" + "s" + "')");
					//if passing in an object. Mapping may need to take place
				}
			});
//
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		myWebview.loadUrl("file:///android_asset/dist/index.html");

	}

	public int getStatusBarHeight() {
		int result = 0;
		int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
		if (resourceId > 0) {
			result = getResources().getDimensionPixelSize(resourceId);
		}
		return result;
	}


	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if ((keyCode == KeyEvent.KEYCODE_BACK) && this.myWebview.canGoBack()) {
			this.myWebview.goBack();
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}


	public void sendAllLessons(){
		Cursor cursor = myDb.getLessons();
		if(cursor.moveToFirst()){
			StringBuffer buffer = new StringBuffer();
			do {
				int _id = cursor.getInt(0);
				String title = cursor.getString(1);
				String  summary = cursor.getString(2);
				String  content = cursor.getString(3);
				String  tags = cursor.getString(4);
				int category = cursor.getInt(5);

				LessonModel newLesson = new LessonModel(_id, title, summary, content, tags, category);
				newLesson.toString();

			} while (cursor.moveToNext());

		} else {
			System.out.println("no data return database");
		}

		cursor.close();
		myDb.close();

	}

	private void hideSystemBars() {
		WindowInsetsControllerCompat windowInsetsController =
				ViewCompat.getWindowInsetsController(getWindow().getDecorView());
		if (windowInsetsController == null) {
			return;
		}
		// Configure the behavior of the hidden system bars
		windowInsetsController.setSystemBarsBehavior(
				WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
		);
		// Hide both the status bar and the navigation bar
		windowInsetsController.hide(WindowInsetsCompat.Type.systemBars());
	}

}



