package com.mynfcatalog;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class SplashActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        startActivity(new Intent(this, MainActivity.class));
        finish();
    }
}