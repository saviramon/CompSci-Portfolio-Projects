function ContactPage() {
    return (
        <>
            <h2>Contact</h2>
            <article>
                <section>
                    <form action="/return" method="POST">
                        <article>
                            <fieldset>
                                <legend>Let's start with some bio info first!</legend>
                                <p>
                                    <label htmlFor="first">First Name:
                                        <input type="text" name="first" id="first" size="30" maxlength="100" required="" placeholder="First Name" />
                                    </label>
                                </p>
                                <p>
                                    <label htmlFor="last">Last Name:
                                        <input type="text" name="last" id="last" size="30" maxlength="100" required="" placeholder="Last Name" />
                                    </label>
                                </p>
                                <p>
                                    <label htmlFor="email">E-mail:
                                        <input type="email" name="email" id="email" size="30" maxlength="100" required="" pattern="[^ @]+@[^ @]+\.[a-z]+" placeholder="example@email.com" />
                                    </label>
                                </p>
                                <p>
                                    <label htmlFor="phone">Phone Number:
                                        <input type="number" name="phone" id="phone" size="10" maxlength="10" required="" placeholder="000000000" />
                                    </label>
                                </p>
                            </fieldset>
                        </article>
                        <article>
                            <fieldset>
                                <legend>Your ideal vehicle</legend>
                                <p>
                                    <label htmlFor="year">Year:
                                        <input type="number" name="year" id="year" size="2" maxlength="4" required="" placeholder="1993" />
                                    </label>
                                </p>
                                <label htmlFor="make">Make:</label>
                                <select name="manufacture" id="make">
                                    <option value="Toyota" selected="">Toyota</option>
                                    <option value="Honda">Honda</option>
                                    <option value="Nissan">Nissan</option>
                                    <option value="Renault">Renault</option>
                                    <option value="Citroen">Citroen</option>
                                    <option value="Saab">Saab</option>
                                    <option value="Mercedes">Mercedes</option>
                                    <option value="BMW">BMW</option>
                                    <option value="Audi">Audi</option>
                                    <option value="Porsche">Porsche</option>
                                    <option value="Ford">Ford</option>
                                    <option value="Jeep">Jeep</option>
                                    <option value="Chevy">Chevy</option>
                                    <option value="Other">Other</option>
                                </select>
                                <p>
                                    <label htmlFor="model">Model:
                                        <input type="text" name="model" id="model" size="30" maxlength="100" required="" placeholder="MR2 Turbo" />
                                    </label>
                                </p>
                                <p>
                                    <label htmlFor="features">What are your favorite features of this vehicle?</label>
                                    <textarea name="features" id="features" rows="5" cols="35" minlength="5" maxlength="250" required="" placeholder="Describe what you like most about this vehicle, in 250 characters or less."></textarea>
                                </p>
                            </fieldset>
                        </article>
                        <article id="formButtons">
                            <fieldset id="tracked">
                                <legend>What have you done with your car?</legend>
                                <p>What kind of events are you interested in?</p>
                                <label htmlFor="carClub">
                                    <input type="checkbox" name="carClub" id="carClub" value="yes" />
                                    Car meets and meeting new people
                                </label>
                                <p>
                                    <label htmlFor="carMods">
                                        <input type="checkbox" name="carMods" id="carMods" value="yes" />
                                        Modifying your car
                                    </label>
                                </p>
                                <p>
                                    <label htmlFor="cannonBall">
                                        <input type="checkbox" name="cannonBall" id="cannonBall" value="yes" />
                                        Traveling around the U.S
                                    </label>
                                </p>
                                <p>Have you ever tracked your car?</p>
                                <label htmlFor="yes">
                                    <input type="radio" name="tracked" id="yes" value="yes" />
                                    Yes
                                </label>
                                <label htmlFor="no">
                                    <input type="radio" name="tracked" id="no" value="no" />
                                    No
                                </label>
                                <button type="submit">Submit</button>
                            </fieldset>
                        </article>
                    </form>
                </section>
            </article>
        </>
    );
}

export default ContactPage;