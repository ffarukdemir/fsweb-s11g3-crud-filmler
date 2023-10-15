import React, { useState } from "react";
import axios from "axios";

const AddMovieForm = (props) => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: "",
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/api/movies", movie)
      .then((res) => {
        props.setMovies(res.data);
        // Yeni film eklemesi başarılı olduğunda formu temizleyin
        setMovie({
          title: "",
          director: "",
          genre: "",
          metascore: 0,
          description: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { title, director, genre, metascore, description } = movie;

  return (
    <div className="bg-white rounded-md shadow flex-1">
      <form onSubmit={handleSubmit}>
        <div className="p-5 pb-3 border-b border-zinc-200">
          <h4 className="text-xl font-bold">Detayları</h4>
        </div>

        {/* İsim, Yönetmen, Tür, Metascore, Açıklama için form alanları burada eklenir */}
        <div className="px-5 py-3">
          <div className="py-2">
            <label className="block pb-1 text-lg">Title</label>
            <input
              value={title} // Bu giriş alanının value değeri state'ten gelir
              onChange={handleChange}
              name="title"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Director</label>
            <input
              value={director} // Bu giriş alanının value değeri state'ten gelir
              onChange={handleChange}
              name="director"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Genre</label>
            <input
              value={genre} // Bu giriş alanının value değeri state'ten gelir
              onChange={handleChange}
              name="genre"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Metascore</label>
            <input
              value={metascore} // Bu giriş alanının value değeri state'ten gelir
              onChange={handleChange}
              name="metascore"
              type="number"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Description</label>
            <textarea
              value={description} // Bu giriş alanının value değeri state'ten gelir
              onChange={handleChange}
              name="description"
            ></textarea>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-2">
          <button
            onClick={() => {
              // "Vazgeç" düğmesine tıklandığında formu temizleyin
              setMovie({
                title: "",
                director: "",
                genre: "",
                metascore: 0,
                description: "",
              });
            }}
            className="myButton bg-zinc-500"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="myButton bg-green-700 hover:bg-green-600"
          >
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;
