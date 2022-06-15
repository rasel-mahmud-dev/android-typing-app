package com.preact_android;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.List;


public class DatabaseHelper<insertData> extends SQLiteOpenHelper {

    public static String DATABASE_NAME = "typo.db";
    public static String TABLE_NAME = "lessons";
    public static String CREATE_TABLE =
            "CREATE TABLE "
            + TABLE_NAME +
            " (" +
                    "_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "title TEXT," +
                    "summary TEXT," +
                    "content TEXT,"+
                    "tags JSON,"+
                    "category INTERGER"+
                    ")";
    public static int VERSION_NUMBER = 2;

    private final Context context;

    public DatabaseHelper(@Nullable Context context) {
        super(context, DATABASE_NAME, null, 1);
        this.context = context;
        SQLiteDatabase db = this.getWritableDatabase();
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(CREATE_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int i, int i1) {
        db.execSQL("DROP TABLE " + DATABASE_NAME);
        this.onCreate(db);
    }


    public boolean insertData(String title, String summary, String content, String tags, int category){
       SQLiteDatabase db = this.getWritableDatabase();
       ContentValues contentValues = new ContentValues();
        contentValues.put("title", title);
        contentValues.put("summary", summary);
        contentValues.put("content", content);
        contentValues.put("tags", tags);
        contentValues.put("category", category);
        final long result = db.insert(TABLE_NAME, null, contentValues);
        return result != -1;
    }

    public Cursor getLessons(){
       SQLiteDatabase db = this.getWritableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + TABLE_NAME, null);
        return  cursor;
    }

 public List<LessonModel> getLessonss(){

     List<LessonModel> lessons = new ArrayList<>();

       SQLiteDatabase db = this.getWritableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + TABLE_NAME, null);


         if(cursor.moveToFirst()){
             do {
                 int _id = cursor.getInt(0);
                 String title = cursor.getString(1);
                 String  summary = cursor.getString(2);
                 String  content = cursor.getString(3);
                 String  tags = cursor.getString(4);
                 int category = cursor.getInt(5);

                 LessonModel newLesson = new LessonModel(_id, title, summary, content, tags, category);
                 lessons.add(newLesson);

             } while (cursor.moveToNext());

         } else {
             System.out.println("no data return database");
         }

         cursor.close();

        return  lessons;
    }



}
