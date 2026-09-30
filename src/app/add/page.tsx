import Image from 'next/image';
import React from 'react';

export default function AddPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* СЕКЦИЯ С ТИТУЛЬНЫМ ИЗОБРАЖЕНИЕМ */}
      <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
        <Image
          src="/svecha.jpg" // Путь к файлу в папке public
          alt="Поминовение - свеча"
          fill // Растягивает картинку на весь блок
          priority // Ускоряет загрузку главной картинки
          style={{
            objectFit: 'cover', // Картинка заполнит блок, не растягиваясь
            objectPosition: 'center',
          }}
        />
        {/* Затемнение поверх картинки, чтобы текст читался лучше */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Подать записку
          </h1>
        </div>
      </div>

      {/* КОНТЕНТ СТРАНИЦЫ (Форма добавления) */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Введите имена для поминовения</h2>
          
          {/* Здесь должна быть твоя форма, которая уже была на сайте */}
          <form>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Тип записки:</label>
              <select style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
                <option>О здравии</option>
                <option>О упокоении</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Имена (каждое с новой строки):</label>
              <textarea 
                rows={5} 
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                placeholder="Иоанна, Марии..."
              ></textarea>
            </div>

            <button type="submit" style={{ 
              backgroundColor: '#b8860b', 
              color: 'white', 
              border: 'none', 
              padding: '12px 25px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '1rem',
              width: '100%'
            }}>
              Отправить записку
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}