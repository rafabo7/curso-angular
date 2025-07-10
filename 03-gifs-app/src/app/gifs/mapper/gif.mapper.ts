import { Gif } from "../interfaces/gif.interface";
import { GiphyItem, GiphyResponse } from "../interfaces/giphy.interfaces";

export class GifMapper {

    static giphyToGifItem( item: GiphyItem ): Gif {

        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url
        }

    }

    static mapGiphyToGifArr( res: GiphyItem[] ): Gif[] {
        return res.map(this.giphyToGifItem)
    }

}