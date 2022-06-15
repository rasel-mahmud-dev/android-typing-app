package com.preact_android;

public class LessonModel {
    private int _id;
    private String title;
    private String summary;
    private String content;
    private String tags;
    private int category;


    public LessonModel(int _id, String title, String summary, String content, String tags, int category) {
        this._id = _id;
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.tags = tags;
        this.category = category;
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "LessonModel{" +
                "_id=" + _id +
                ", title='" + title + '\'' +
                ", summary='" + summary + '\'' +
                ", content='" + content + '\'' +
                ", tags='" + tags + '\'' +
                ", category=" + category +
                '}';
    }
}
