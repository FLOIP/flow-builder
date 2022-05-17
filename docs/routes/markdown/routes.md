<!-- Generator: Widdershins v4.0.1 -->

<h1 id="flow-builder-routes">Flow Builder Routes v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

This document describes the specification for any implementation of the server required for integration of the flow builder with a backend.

Base URLs:

* <a href="/">/</a>

<h1 id="flow-builder-routes-flows">Flows</h1>

Operations about flows and flow blocks

<a href="https://floip.gitbook.io/flow-specification/">Find out more about flows</a>

## Fetch Flow

<a id="opIdFetch Flow"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/flows/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /flows/{id}`

*Finds Flow in Container by ID. Route can be anything and is configured in builder.config.json - the UUID, body and verb are what matters.*

<h3 id="fetch-flow-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|uuid|true|ID of flow to return.|

> Example responses

> 200 Response

```json
{
  "specification_version": "string",
  "uuid": "string",
  "name": "string",
  "description": "string",
  "vendor_metadata": {},
  "flows": [
    {}
  ],
  "resources": {}
}
```

<h3 id="fetch-flow-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns the flow in a container on success. See https://floip.gitbook.io/flow-specification/flows#containers for full spec. The 'flows' attribute of the returned container will contain the flow itself and any nested flows. 'resources' will contain any nested resources|[FlowContainer](#schemaflowcontainer)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Flow not found|None|

<h3 id="fetch-flow-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Save Flow

<a id="opIdSave Flow"></a>

> Code samples

```javascript
const inputBody = '{
  "specification_version": "string",
  "uuid": "string",
  "name": "string",
  "description": "string",
  "vendor_metadata": {},
  "flows": [
    {}
  ],
  "resources": {}
}';
const headers = {
  'Content-Type':'*/*',
  'Accept':'application/json'
};

fetch('/flows',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /flows`

*Create a Flow and associated Resources. UUIDs are generated client side so the builder can operate without a backend. That means we need to track whether the flow is created on the server or not in this builder with an attribute on the container - `created` - rather than with whether or not the flow has a uuid yet. `created` is not sent to the server. This route is used when `created` === false Route can be anything and is configured in builder.config.json - the body and verb are what matters.*

> Body parameter

<h3 id="save-flow-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[FlowContainer](#schemaflowcontainer)|true|none|

> Example responses

> 200 Response

```json
{
  "specification_version": "string",
  "uuid": "string",
  "name": "string",
  "description": "string",
  "vendor_metadata": {},
  "flows": [
    {}
  ],
  "resources": {}
}
```

<h3 id="save-flow-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Echos back the sent flow in a container on success. See https://floip.gitbook.io/flow-specification/flows#containers for full spec. The 'flows' attribute of the returned container will contain the flow itself and any nested flows. 'resources' will contain any nested resources|[FlowContainer](#schemaflowcontainer)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error in flow creation including validation errors (the builder should prevent these client side before we get to that point though)|None|

<h3 id="save-flow-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Update Flow

<a id="opIdUpdate Flow"></a>

> Code samples

```javascript
const inputBody = '{
  "specification_version": "string",
  "uuid": "string",
  "name": "string",
  "description": "string",
  "vendor_metadata": {},
  "flows": [
    {}
  ],
  "resources": {}
}';
const headers = {
  'Content-Type':'*/*',
  'Accept':'application/json'
};

fetch('/flows',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /flows`

*Update a Flow and associated Resources. UUIDs are generated client side so the builder can operate without a backend. That means we need to track whether the flow is created on the server or not in this builder with an attribute on the container - `created` - rather than with whether or not the flow has a uuid yet. `created` is not sent to the server. This route is used when `created` === true Route can be anything and is configured in builder.config.json - the body and verb are what matters.*

> Body parameter

<h3 id="update-flow-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[FlowContainer](#schemaflowcontainer)|true|none|

> Example responses

> 200 Response

```json
{
  "specification_version": "string",
  "uuid": "string",
  "name": "string",
  "description": "string",
  "vendor_metadata": {},
  "flows": [
    {}
  ],
  "resources": {}
}
```

<h3 id="update-flow-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Echos back the sent flow in a container on success. See https://floip.gitbook.io/flow-specification/flows#containers for full spec. The 'flows' attribute of the returned container will contain the flow itself and any nested flows. 'resources' will contain any nested resources|[FlowContainer](#schemaflowcontainer)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error in flow update including validation errors. The builder should prevent these client side before we get to that point but that cannot always be done due to race conditions around concurrent use.|None|

<h3 id="update-flow-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="flow-builder-routes-languages">Languages</h1>

## Save Language

<a id="opIdSave Language"></a>

> Code samples

```javascript
const inputBody = '{
  "bcp_47": "string",
  "id": "string",
  "iso_639_3": "string",
  "label": "string",
  "variant": "string"
}';
const headers = {
  'Content-Type':'*/*',
  'Accept':'application/json'
};

fetch('/languages',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /languages`

*Create a single new Flow Spec compliant language on the server. The created language may be associated with an account. Languages associated with an account/the current session should override the hard coded languages in builder.config.json. Route can be anything and is configured in builder.config.json - the body and verb are what matters.*

> Body parameter

<h3 id="save-language-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Language](#schemalanguage)|true|none|

> Example responses

> 200 Response

```json
{
  "bcp_47": "string",
  "id": "string",
  "iso_639_3": "string",
  "label": "string",
  "variant": "string"
}
```

<h3 id="save-language-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Echos back the language for pushing into the languages array in the vuex tree state - `ui.languages`. See https://floip.gitbook.io/flow-specification/flows#language-objects-and-identifiers for full spec. The backend may make any changes it needs to the posted language as long as the id stays the same and the returned language conforms to the spec|[Language](#schemalanguage)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error in language creation including validation errors. The builder should prevent these client side before we get to that point but that cannot always be done due to race conditions around concurrent use.|None|

<h3 id="save-language-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="flow-builder-routes-audiofiles">Audiofiles</h1>

## Upload Audiofiles

<a id="opIdUpload Audiofiles"></a>

> Code samples

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'audio/*',
  'Accept':'application/json'
};

fetch('/audiofiles/upload',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /audiofiles/upload`

*All services are available through voice in multiple languages. This requires users to upload audio file segments to use for messages, survey questions, menus, etc. For example, each survey question would require one audio file in each language. The audio_files interface allows you to upload, update, query, or delete audio files that will later be used for any of these purposes. -- Since the entire POST body will be treated as the file, the parameters must be passed as part of the URL. Note that this differs from all other API requests, where the url-encoded parameters are passed in the request body as a regular POST.*

> Body parameter

> Example responses

> 200 Response

```json
{
  "uri": "??",
  "audio_file_id": 918719,
  "duration_seconds": 2.802,
  "description": "53f7f192c5fa82.79265819.wav",
  "created_at": "2022-03-24T15:01:35.000000Z",
  "audio_uuid": "623c87ceae7aa0.02375053"
}
```

<h3 id="upload-audiofiles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Information about the new audio file|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown upload error|Inline|

<h3 id="upload-audiofiles-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» uri|string|false|none|resource value for IVR|
|» audio_file_id|string|false|none|file identifier|
|» duration_seconds|number|false|none|the duration of the audio in seconds|
|» description|string|false|none|human-recognizable description for this audio (e.g. original file name)|
|» created_at|string|false|none|upload date in ISO format|
|» audio_uuid|string|false|none|uuid|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|short error description|
|» status_description|string|false|none|error description|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_FlowContainer">FlowContainer</h2>
<!-- backwards compatibility -->
<a id="schemaflowcontainer"></a>
<a id="schema_FlowContainer"></a>
<a id="tocSflowcontainer"></a>
<a id="tocsflowcontainer"></a>

```json
{
  "specification_version": "string",
  "uuid": "string",
  "name": "string",
  "description": "string",
  "vendor_metadata": {},
  "flows": [
    {}
  ],
  "resources": {}
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|specification_version|string|false|none|none|
|uuid|string|false|none|none|
|name|string|false|none|none|
|description|string|false|none|none|
|vendor_metadata|object|false|none|none|
|flows|[object]|false|none|none|
|resources|object|false|none|none|

<h2 id="tocS_Language">Language</h2>
<!-- backwards compatibility -->
<a id="schemalanguage"></a>
<a id="schema_Language"></a>
<a id="tocSlanguage"></a>
<a id="tocslanguage"></a>

```json
{
  "bcp_47": "string",
  "id": "string",
  "iso_639_3": "string",
  "label": "string",
  "variant": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|bcp_47|string|false|none|none|
|id|string|false|none|none|
|iso_639_3|string|false|none|none|
|label|string|false|none|none|
|variant|string|false|none|none|

