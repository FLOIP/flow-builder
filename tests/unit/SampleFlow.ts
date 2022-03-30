// A sample flow generated and exported using floip.github.io, it has only one block - message block
const TEST_FLOW = JSON.parse(`{
  "specification_version": "1.0.0-rc2",
  "uuid": "3666a05d-3792-482b-8f7f-9e2472e4f027",
  "name": "TODO",
  "description": "TODO",
  "vendor_metadata": {},
  "flows": [
    {
      "uuid": "5407448a-a14b-47bb-a50c-b3e1dc1650f3",
      "name": "Testflowlabel",
      "label": "Test flow label",
      "last_modified": "2022-03-30T18:57:38.629Z",
      "interaction_timeout": 1000000,
      "vendor_metadata": {},
      "supported_modes": [
        "SMS"
      ],
      "languages": [
        {
          "id": "22",
          "label": "English",
          "iso_639_3": "eng"
        }
      ],
      "blocks": [
        {
          "uuid": "0afcf9ad-6371-478c-b021-275e0d63594b",
          "ui_metadata": {
            "canvas_coordinates": {
              "x": 421,
              "y": 537
            }
          },
          "vendor_metadata": {
            "io_viamo": {
              "uiData": {
                "isSelected": false
              },
              "branchingType": "UNIFIED",
              "noValidResponse": "END_CALL"
            }
          },
          "type": "MobilePrimitives.Message",
          "name": "test_message_block_title",
          "label": "Test message block title",
          "semantic_label": "",
          "exits": [
            {
              "uuid": "59477376-9f1f-45b6-b772-02dce5c83db7",
              "name": "1",
              "test": "block.value > 0",
              "config": {}
            },
            {
              "uuid": "30f18775-4873-4f6e-8844-7c7e775e42fd",
              "name": "Default",
              "default": true,
              "test": "",
              "config": {}
            }
          ],
          "config": {
            "prompt": "727fc864-5777-46eb-9006-c2d60bf2fc86"
          },
          "tags": []
        }
      ],
      "first_block_id": "0afcf9ad-6371-478c-b021-275e0d63594b"
    }
  ],
  "resources": [
    {
      "uuid": "727fc864-5777-46eb-9006-c2d60bf2fc86",
      "values": [
        {
          "language_id": "22",
          "value": "",
          "content_type": "TEXT",
          "modes": [
            "TEXT"
          ]
        },
        {
          "language_id": "22",
          "value": "Test message block SMS content",
          "content_type": "TEXT",
          "modes": [
            "SMS"
          ]
        },
        {
          "language_id": "22",
          "value": "",
          "content_type": "TEXT",
          "modes": [
            "USSD"
          ]
        },
        {
          "language_id": "22",
          "value": "",
          "content_type": "AUDIO",
          "modes": [
            "IVR"
          ]
        },
        {
          "language_id": "22",
          "value": "",
          "content_type": "TEXT",
          "modes": [
            "RICH_MESSAGING"
          ]
        },
        {
          "language_id": "22",
          "value": "",
          "content_type": "IMAGE",
          "modes": [
            "RICH_MESSAGING"
          ]
        },
        {
          "language_id": "22",
          "value": "",
          "content_type": "VIDEO",
          "modes": [
            "RICH_MESSAGING"
          ]
        },
        {
          "language_id": "22",
          "value": "",
          "content_type": "TEXT",
          "modes": [
            "OFFLINE"
          ]
        },
        {
          "language_id": "22",
          "value": "",
          "content_type": "IMAGE",
          "modes": [
            "OFFLINE"
          ]
        },
        {
          "language_id": "22",
          "value": "",
          "content_type": "VIDEO",
          "modes": [
            "OFFLINE"
          ]
        }
      ]
    }
  ]
}`)

export default TEST_FLOW
