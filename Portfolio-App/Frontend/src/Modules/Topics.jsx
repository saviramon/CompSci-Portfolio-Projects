function Topics(){
    return (
        <>
        <h2>Web Development Topics</h2>
        <article id="servers">
            <nav class="local">
              <a href="#servers">Web Servers</a>
              <a href="#design">Frontend Design</a>
              <a href="#images">Image Optimization</a>
              <a href="#favicons">Favicons</a>
              <a href="#css">CSS</a>
            </nav>
            <h3>Web Servers</h3>
            <p>
              The file <strong>index.html</strong> in most real-world web
              applications is called the <strong>designated home page</strong>.
              The index.html in the root directory is the home page of a web
              application, and the application is set up to return to this file
              whenever a <strong>GET request</strong> is received for the /. The
              name of the index file relates to other servers, such as
              Microsoft's.NET platform. You are able to use default.html as the
              equivalent of index.html to use as the designated home page.
              Secondly, the index file name is relevant to programming languages
              as well, because a server may designate a JavaScript (index.js) file
              or a hypertext preprocessor file (index.php) as the homepage.
            </p>
            <p>
              In the browser's Inspector, Network tab, the output screen shows the
              name of the files requested from the <strong>web server</strong>.
              When you click a file in the network tab, you are able to see
              several drop-down menus (general, request, and response). In the
              general header, the <strong>URL</strong>, request method, status
              code, <strong>remote address (IP)</strong>, and policy are returned.
              Information in the request header provides additional information
              about the acceptance of the request, which includes the language,
              cache controls, host, encoding, and user agent or browser that is
              being used. Lastly, information in the response header provides
              information regarding the cache details, content type, date, and
              time the file was accessed, as well as the date it was last
              modified. In the Response tab, you are able to see the
              <strong>raw response data</strong>, which generally includes
              <strong>HTML</strong>, <strong>CSS</strong>, and
              <strong>JavaScript</strong>. The difference between file details
              from a web server and file details from a local computer is that
              when a file is accessed locally, the URL is a file path from within
              the computer's hard drive. Also, the request header only provides
              the web browser and the
              <strong>operating system</strong>
              that is being used. In the request header, there is a caution
              message stating, "Provisional headers are shown." Additionally, the
              timing of a locally provided file loads much faster since it is not
              being requested from a server.
            </p>
            <p>
              The favicon.ico has a <strong>status 200</strong> because it was
              requested from the ENGR Web server at this URL:
              https://web.engr.oregonstate.edu/favicon.ico. The main.css and the
              main.js have <strong>status 404</strong>, which means they are not
              found. The files main.css and main.js are not found because the
              requested resource is not on the server, although they are being
              requested within the index.html file. If these files were created
              and placed in the file directory, status 400 would change to status
              200.
            </p>
            <p>
              The <strong>scheme/protocol</strong> identifies the protocol the web
              client must use to request the resource, and it is found at the
              beginning of a URL, ending in a colon. Currently, most websites use
              the <strong>HTTPS</strong> scheme. Previously, websites used
              <strong>HTTP</strong>. Some other schemes that browsers know how to
              use to send requests and handle responses are
              <strong>ftp</strong> (unencrypted) and
              <strong>ftps</strong> (encrypted) to handle file transfers, and
              <strong>SMS</strong> for interacting with devices that understand
              the SMS text messaging service. Additionally, the
              <strong>file</strong> scheme is used to read files from the local
              machine, and <strong>view-source</strong> us used to view the source
              of a page in the browser. The second part of a URL following the
              scheme is the <strong>domain</strong> name, preceded by "//". The
              domain name is mapped to the IP address for that server machine. A
              <strong>subdomain</strong> may also be present in a URL when you
              access a subsection of a domain/server, and it is represented like
              so, "subdomain.domain.extension". Thirdly, after the server name,
              there is the <strong>port number</strong>. However, the port number
              is generally not displayed because if the URL has an HTTPS scheme,
              the universal port number for HTTPS is 443. If the port number is
              visible, it is preceded by a colon (aka: <strong>port</strong>).
              After the port number, there is the
              <strong>path to the resource</strong> preceded by a single slash.
              This part of the URL identifies the resource on the server that is
              being accessed. In regard to my web server's URL
              (https://web.engr.oregonstate.edu/~tejadax/a1-tejadax/), the scheme
              is "HTTPS:", the subdomain is "web.engr.", the main domain and the
              extension are "oregonstate.edu", the port number would be 443,
              although it is not visible in my web server URL, and the path to the
              resource is "/~tejadax/a1-tejadax/".
            </p>
          </article>
          <article id="design">
            <h3>Frontend Design</h3>
            <p>
              Frontend design is creating a useful and intuitive experiences on
              a web or mobile application. It generally includes the visual design
              of the page, the <strong>graphical user-interface (GUI)</strong>,
              and choosing how an individual will interact with the application. When
              implementing a visual design, you want to have a uniform color
              scheme, font and typography scheme, photography icon, and
              illustration scheme. Also, the form of navigation has to make
              sense depending on what platform the application is being viewed on,
              such as a monitor, or mobile device. Lastly, the <strong>usability/inclusivity</strong> is how the quality of
              a users experience is measured when they are interacting with a product or system. A good system to follow for
              good
              frontend design and usability/inclusivity, are the five "E's" of
              usability:
            </p>
            <p>
            <dl>
              <dt><strong>Effective</strong></dt>
              <dd>Are the goals of the work or experience complete and
                accurate.</dd>
              <dt><strong>Efficient</strong></dt>
              <dd>Is the work completed in a timely fashion.</dd>
              <dt><strong>Engaging</strong></dt>
              <dd>Does the interface invite the user to interact with it, and is it
                satisfying to use.</dd>
              <dt><strong>Error Tolerant</strong></dt>
              <dd>Can the product prevent errors from happening, and when they do,
                is it able to help the user recover data or
                progress when mistakes occur.</dd>
              <dt><strong>Easy to Learn</strong></dt>
              <dd>Is the initial representation of the product intuitive, and does it
                support the continued learning of the
                product's
                growth throughout its lifecycle.</dd>
            </dl>
            </p>
            <p><strong>Block-level elements</strong>, such as page layout tags,
              break up the flow of the content and start a
              <strong>new-line</strong> both before and after the element.
              Some page layout tags include the <strong>header</strong>,
              <strong>nav</strong>, <strong>main</strong>,
              <strong>section</strong>, <strong>article</strong>, and
              <strong>footer</strong>.
              The header element is generally the same from page-to-page to maintain a
              familiarity with the site. It includes the
              name,
              publisher, and marketing slogan. The nav element takes users from
              one page to another, and can be used to set
              up a
              main menu, search, tools, stories,
              locations, and legal links. The main element is the primary block
              that has the content of the site, which
              includes
              stories, tutorials, and other multimedia. A section element groups
              similar content that is all related. The
              <strong>H1</strong> denotes a headline that is the
              general theme of its content. The article element relates to a
              single topic, and is usually found inside the
              section element, where it will have a second-level headline
              <strong>H2</strong>. When there are multiple
              articles in a
              section that are marked with <strong>ID selectors</strong>
              (#topic), this allows them to be styled differently and can be used in
              <strong>anchor elements</strong> when
              jumping
              to specific parts of a page. Lastly, the footer element is outside
              the main element at the bottom of the
              page and
              typically holds legal and contact information, and
              links to critical pages.
            </p>
            <p>
            <ol>
              <li>Anchor links to <strong>external content</strong> are represented in between the
                opening and closing of the anchor element
                (represented as "<strong>a</strong>"). Within these tags the
                <strong>href</strong> attribute is used to
                specify the
                URL or path that the link is going to take you.
                After the href attribute, you are able to input text to describe
                where the link is going to take the user. Complete URLs to a resource is generally known as an
                <strong>absolute path</strong>, these are best used to linking outside resources.
              </li>
              <li>Anchor elements that link to <strong>internal content</strong>, such as an
                article that is on the same page, utilize an ID
                selector, denoted by a "#" followed by the topic (#topic), which can be
                inputted into "href", along with a short
                description of where the link will jump
                to in the page. A <strong>relative path</strong> is generally used for linking resources that are within the
                same directory or folder.</li>
              <li><strong>Page-to-page</strong> anchor links utilize decorative and noticeable
                button-like anchors that allow the movement
                between
                pages, external social media sites, external career pages, and
                other resources. These buttons increase the
                usability
                of websites and apps,
                because they also allow ease of access to all functions of the
                site and other related sites.</li>
            </ol>
            </p>
          </article>
          <article id="images">
            <h3>Image Optimization</h3>
            <p>There are 6 major image optimization specifications. First, a <strong>descriptive file name</strong>, which
              should include the who, what, when, and where of an image. It is important to be descriptive in the file name
              because it improves the <strong>search engine optimization</strong> (SEO). SEO allows search engine bots to
              categorize an image based on its description when a user is searching keywords in an image description.
              Secondly, a <strong>small file size</strong>, allows images to load faster and has only high resolution on
              devices that can support it. To make files smaller, we can compress them in either <strong>lossy
                compression</strong> or <strong>lossless compression</strong>. Lossy compression results in the loss of
              image data, which can cause pixelation. However, lossless compression will retain its original visual quality.
              Thirdly, the <strong>exact dimensions</strong> of a photo can be a factor in the optimization of a webpage.
              Cropping photos to reduce the size of an image is beneficial to ensuring that the image will fit within a
              specific portion of a webpage. Having the <strong>correct file format</strong> is important for images because
              some images could lose details if that file format is not supported. Generally, you want to use ".JPG" for
              photos, line-art images as ".GIF" or "8-bit .PNG", and graphics with transparency need "24-bit .PNG".
              <strong>Reduced resolutions</strong> are must be taken into account, because not all monitors are created
              equal. The typical pixel per inch (ppi) is 72ppi. However, some monitors support higher resolutions, which,
              result in higher pixel densities. Therefore, reducing resolution based on the monitor resolutions allows for
              webpages to be loaded at appropriate speeds based on the monitor specification. Lastly, the <strong>color
                mode</strong> is used to determine how the color is going to be represented in an image based on its
              contents and file format. Typically, RGB and RGBA are used for .PNG, .JPG, .SVG, and .WebP, and indexed for
              .GIF and sometimes 8-bit .PNG.
            </p>
            <p>There are several formats for images on a webpage, that determine how a photo will be portrayed.
              <strong>Scalable Vector Graphics (SVG)</strong> image are generally 2-dimensional, interactive, or animated,
              and the text is generally crisp. A <strong>GIF</strong> file is typically a short photo or video. They have
              8-bit transparency and animation that is used for line-art graphics. <strong>PNG</strong> files have true
              transparency and can be used with an RGB or index color mode. They can be placed over different colors and not
              become distorted. <strong>JPG</strong> files are only used for photographic images. These photos would have
              millions of colors and be full of detail. This file format is correlated with cameras, and this can result in
              a large file size. These images are mainly resized and compressed to lessen the load on web servers.
              <strong>WebP</strong> files are used only for photographic images. These images can compress down to smaller
              file sizes. However, the compression and quality of a Webp photo are indirectly proportional to each other.
            </p>
          </article>
          <article id="favicons">
            <h3>Favicons</h3>
            <p><strong>Favicons</strong>, also known as favorite icons, and touch icons, are used in browsers through
              downloaded files within the root directory that allow the compatibility of a favicon across different
              platforms. Web browsers will download the favicons in the background, so that the favicon image does not
              hinder a website's performance. When a favicon is used on a website, it will save the icon and anchor, to a
              bookmark or favorites list. It is also shown in the tab of the page in the browser, which helps with the
              differentiation of a user's tabs. Secondly, on mobile devices, the image used in a favicon is shown as the
              background of the bookmarked website. </p>
          </article>
          <article id="css">
            <h3>Cascading Stylesheets (CSS)</h3>
            <p>The main reasons to incorporate <strong>Cascading Style Sheets (CSS)</strong> in websites and apps are to
              manipulate the structure, content, and components should look. This then allows the improvement of
              usability, readability, legibility, and compliance to brand requirements of a website or application.
            </p>
            <p> There are 5 ways to incorporate style sheets:
            <ol>
              <li><strong>Embedded</strong> within <code>&lt;style&gt;</code> tags.</li>
              <li><strong>Inline</strong> within an element using an attribute and value.</li>
              <li><strong>Regular JavaScript</strong>, by manipulating the <strong>Document Object Model (DOM).</strong>
              </li>
              <li><strong>External CSS</strong> file, where rules are made that define an element's selector are usually
                done in
                more than one external file. These files have a .css extension and are linked by using the
                <code>&lt;link&gt;</code> tag in the global <code>&lt;head&gt;</code> tag
                of a website.</li>
              <li>Other stylesheets can also be <strong>imported</strong> after the global .css file using @import.</li>
            </ol>
            </p>
      </article>
        </>
    )
}
export default Topics;