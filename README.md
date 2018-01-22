# Gitbook Plugin - API
Write beautiful API documentation with GitBook

This plugins requires gitbook `>=2.0.0`.

## Installation

Add the plugin to your `book.json`, then run `gitbook install`:

```
{
    plugins: ["api"]
}
```

You can now start writing API documentation:

    {% api "List App Pages", method="GET", url="https://www.magloft.com/api/portal/v1/app_pages/:app_id/page/:page" %}

    This endpoint **returns** a list of all `app pages` that belong to the magazine

    ### Parameters:

    | Name       | Type    | Desc                                                |
    | :--------- | :------ | :-------------------------------------------------- |
    | **app_id** | String  | App ID to list app pages for                        |
    | **page**   | Integer | The page to list                                    |
    | per_page   | Integer | Number of items to show per page                    |
    | order_by   | Symbol  | Field to sort results by                            |
    | order_dir  | Symbol  | Direction (asc, desc) to sort results by            |
    | filter     | String  | Text filter to search pages by name, title and html |

    ### Response:

    ```json
    {
      "id": 1234,
      "title": "Welcome to MagLoft"
    }
    ```

    {% endapi %}
