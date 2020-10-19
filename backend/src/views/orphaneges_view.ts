import Orphanege from '../model/Orphanege';
import imagesView from './images_view';

export default {
    render(orphanege: Orphanege){
        return{
            id: orphanege.id,
            name: orphanege.name,
            latitude: orphanege.latitude,
            longitude: orphanege.longitude,
            about: orphanege.about,
            instructions: orphanege.instructions,
            opening_hours: orphanege.opening_hours,
            open_on_weekends: orphanege.open_on_weekends,
            images: imagesView.renderMany(orphanege.images)
        };
    },

    renderMany(orphaneges: Orphanege[]){
        return orphaneges.map(orphanege => this.render(orphanege));
    }
}