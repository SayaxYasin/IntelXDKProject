(function (window, document) {

    Storage = function (clear) {

        var that = this;
        that.DB = window.localStorage;
        that.clear = clear;

        that.CreateStorage();

    };

    Storage.prototype = {

        CreateStorage: function () {
            var that = this;
            var DB = that.DB;

            if (DB.getItem("LocalStorage") != null && DB.getItem("LocalStorage") == "Created")
                return;

            if (that.clear == true)
            {
                DB.clear();
                DB.setItem("LocalStorage", "Created");
            }
            else
                DB.setItem("LocalStorage", "Created");
        },

        GetItem: function (key) {

            if (key == null || key == "")
                return false;

            var that = this;
            var DB = that.DB;

            return JSON.parse(DB.getItem(key));
        },

        GetItemFromArray: function (key, sequence) {

            try {
                var that = this;
                var DB = that.DB;

                var objects = [];
                var localObject = DB.getItem(key);
                if (localObject != null) {
                    objects = JSON.parse(localObject);

                    if (objects.length > sequence)
                        return objects[sequence];
                    else
                        return null;
                }
                else {
                    return null;
                }

            } catch (ex) {
                alert("ERROR : " + ex);
                return null;
            }
        },

        SetItem: function (key, value) {

            if (key == null || key == "")
                return false;

            var that = this;
            var DB = that.DB;

            DB.setItem(key, JSON.stringify(value));
            return true;
        },

        SetItemRange: function (key, values) {

            if (key == null || key == "")
                return false;

            if (values == null)
                return true;

            if (values.length == 0)
                return true;

            try {
                var that = this;
                var DB = that.DB;

                var oldObject = [];
                var newObject = [];

                var localObject = DB.getItem(key);
                if (localObject != null) {
                    oldObject = JSON.parse(localObject);
                    for (var i = 0; i < oldObject.length; i++) {
                        newObject.push(oldObject[i]);
                    }

                    for (var i = 0; i < values.length; i++) {
                        newObject.push(values[i]);
                    }
                }
                else {
                    return false;
                }

                DB.setItem(key, JSON.stringify(newObject));
                return true;

            } catch (ex) {
                alert("ERROR : " + ex);
            }

            DB.setItem(key, value);
            return true;
        },

        SetItemInArray: function (key, value) {

            if (key == null || key == "")
                return false;

            if (value == null)
                return true;

            try {
                var that = this;
                var DB = that.DB;

                var oldObject = [];
                var newObject = [];

                var localObject = DB.getItem(key);
                if (localObject != null) {
                    oldObject = JSON.parse(localObject);
                    for (var i = 0; i < oldObject.length; i++) {
                        newObject.push(oldObject[i]);
                    }

                    newObject.push(value);
                }
                else {
                    newObject.push(value);
                }

                DB.setItem(key, JSON.stringify(newObject));
                return true;

            } catch (ex) {
                alert("ERROR : " + ex);
                return false;
            }

            
        },

        RemoveItem: function (key) {

            if (key == null || key == "")
                return false;

            var that = this;
            var DB = that.DB;

            DB.removeItem(key);

            return true;
        },

        RemoveItemFromArray: function (key, sequence) {

            try {
                var that = this;
                var DB = that.DB;

                var oldObject = [];
                var newObject = [];

                var localObject = DB.getItem(key);
                if (localObject != null) {
                    oldObject = JSON.parse(localObject);
                    for (var i = 0; i < oldObject.length; i++) {

                        if (i == sequence)
                            continue;

                        newObject.push(oldObject[i]);
                    }
                }
                else {
                    return false;
                }

                DB.setItem(key, JSON.stringify(newObject));
                return true;
            } catch (ex)
            {
                alert("Silme islemi basarili degil! - ERROR : " + ex);
            }
        },

        UpdateItemInArray: function (key, sequence, newValue) {

            try {
                var that = this;
                var DB = that.DB;

                var oldObject = [];
                var newObject = [];

                var localObject = DB.getItem(key);
                if (localObject != null) {
                    oldObject = JSON.parse(localObject);
                    for (var i = 0; i < oldObject.length; i++) {

                        if (i == sequence)
                            newObject.push(newValue);
                        else
                            newObject.push(oldObject[i]);
                    }

                }
                else {
                    return false;
                }

                DB.setItem(key, JSON.stringify(newObject));
                return true;
            } catch (ex) {
                alert("Update islemi basarili degil! - ERROR : " + ex);
            }
        },

        ClearStorage: function () {
            var that = this;
            var DB = that.DB;

            DB.clear();
            return true;
        },
    };


})(window, document);