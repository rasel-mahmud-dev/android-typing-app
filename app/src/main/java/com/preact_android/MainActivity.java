package com.preact_android;

import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;


public class MainActivity extends AppCompatActivity {

	WebView myWebview = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);


		hideSystemBars();
		setContentView(R.layout.activity_main);

		this.myWebview = (WebView) findViewById(R.id.webview);
		myWebview.addJavascriptInterface(new WebAppInterface(this, myWebview), "Android");

		WebSettings webSettings = myWebview.getSettings();
		webSettings.setJavaScriptEnabled(true);
		webSettings.setDomStorageEnabled(true);

//		myWebview.setWebViewClient(new WebViewClient());
		myWebview.setWebChromeClient(new WebChromeClient());
		myWebview.loadUrl("file:///android_asset/dist/index.html");
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if ((keyCode == KeyEvent.KEYCODE_BACK) && this.myWebview.canGoBack()) {
			this.myWebview.goBack();
			return true;
		}
		return super.onKeyDown(keyCode, event);
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



