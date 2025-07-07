import { MediaModel } from "../models/MediaModel";

export const MediaService = {
  async uploadMedias(mediaUrls: string[], ownerId: string) {    
    const mediaDocs = mediaUrls.map((url) => ({ 
      url,
      owner_id: ownerId
    }));
    const mediaDoc = await MediaModel.insertMany(mediaDocs);
    return mediaDoc
  },

  async getMediaById(mediaId: string) {
    return await MediaModel.findById(mediaId).lean()
  }
}
