import mr2          from '../assets/toyota-mr2.jpg'
import outrigger    from '../assets/polynesian-outrigger-canoe.jpg'
import paradise     from '../assets/paradise-mt-ranier.jpg' 
import engine       from '../assets/sgte-motor.jpg'


function GalleryPage(){
    const images = [mr2, outrigger, paradise, engine]

    return (
        <>
            <h2>Gallery</h2>
            
            <p>These are some images of my hobbies and places I have been.</p>

            <article className="gallery">
                {
                    images.map((image) =>
                        <figure>
                            <img src={image} alt="" title=""/>
                        </figure>
                        )
                }
            </article>
            
        </>
    )
}
export default GalleryPage;