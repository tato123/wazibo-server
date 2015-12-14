define({ "api": [
  {
    "type": "post",
    "url": "/media/upload",
    "title": "Upload Image",
    "name": "Upload_Image",
    "group": "Media",
    "version": "0.0.0",
    "filename": "routes/1.0/media.js",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/media/:id",
    "title": "Get Image",
    "name": "View_media_record",
    "group": "Media",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>SaleMedia</p> ",
            "optional": false,
            "field": "Sale",
            "description": "<p>media object containing a record of an upload</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/1.0/media.js",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/sale_event",
    "title": "Get all events",
    "name": "Get_all_events",
    "group": "Sale_Event",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>SaleMedia</p> ",
            "optional": false,
            "field": "Sale",
            "description": "<p>media object containing a record of an upload</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/1.0/sale_event.js",
    "groupTitle": "Sale_Event"
  },
  {
    "type": "get",
    "url": "/sale_event/:id",
    "title": "Get event by id",
    "name": "Get_event_by_id",
    "group": "Sale_Event",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>SaleMedia</p> ",
            "optional": false,
            "field": "Sale",
            "description": "<p>media object containing a record of an upload</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/1.0/sale_event.js",
    "groupTitle": "Sale_Event"
  },
  {
    "type": "post",
    "url": "/sale_event",
    "title": "New Event",
    "name": "Post_a_new_event",
    "group": "Sale_Event",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>SaleMedia</p> ",
            "optional": false,
            "field": "Sale",
            "description": "<p>media object containing a record of an upload</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/1.0/sale_event.js",
    "groupTitle": "Sale_Event"
  },
  {
    "type": "post",
    "url": "/sale_event/:id",
    "title": "Update event",
    "name": "Update_an_event",
    "group": "Sale_Event",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>SaleMedia</p> ",
            "optional": false,
            "field": "Sale",
            "description": "<p>media object containing a record of an upload</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/1.0/sale_event.js",
    "groupTitle": "Sale_Event"
  },
  {
    "type": "get",
    "url": "/sale_item/:id",
    "title": "Get all items",
    "name": "Get_all_items",
    "group": "Sale_Item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>SaleItem</p> ",
            "optional": false,
            "field": "Sale",
            "description": "<p>media object containing a record of an upload</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/1.0/sale_item.js",
    "groupTitle": "Sale_Item"
  },
  {
    "type": "get",
    "url": "/sale_item/:id",
    "title": "Get item by id",
    "name": "Get_item_by_id",
    "group": "Sale_Item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>SaleItem</p> ",
            "optional": false,
            "field": "Sale",
            "description": "<p>media object containing a record of an upload</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/1.0/sale_item.js",
    "groupTitle": "Sale_Item"
  },
  {
    "type": "post",
    "url": "/sale_item/:id",
    "title": "Post new item",
    "name": "Post_new_item",
    "group": "Sale_Item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>SaleItem</p> ",
            "optional": false,
            "field": "Sale",
            "description": "<p>media object containing a record of an upload</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/1.0/sale_item.js",
    "groupTitle": "Sale_Item"
  },
  {
    "type": "post",
    "url": "/sale_item/:id",
    "title": "Update sale item",
    "name": "Update_item_by_id",
    "group": "Sale_Item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>SaleItem</p> ",
            "optional": false,
            "field": "Sale",
            "description": "<p>media object containing a record of an upload</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/1.0/sale_item.js",
    "groupTitle": "Sale_Item"
  }
] });