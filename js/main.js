/* =========================================================
   Dr. Otávio Messias — Interações da Página
   ========================================================= */

(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* ---------- Sempre abrir no começo da página ---------- */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function irParaTopo() {
    var raiz = document.documentElement;
    raiz.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    raiz.style.scrollBehavior = '';
  }

  if (location.hash) {
    try {
      history.replaceState(null, '', location.pathname + location.search);
    } catch (e) {}
  }
  irParaTopo();
  window.addEventListener('load', irParaTopo);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) irParaTopo();
  });

  var header = document.getElementById('site-header');
  var hero = document.getElementById('topo');
  var floating = document.getElementById('floating-cta');
  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.getElementById('nav');

  /* ---------- Menu fixo e Botão Flutuante ---------- */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
    }

    if (floating) {
      var heroEnd = hero ? hero.offsetHeight - 120 : 600;
      var finalCta = document.getElementById('agendar');
      var nearEnd = finalCta && finalCta.getBoundingClientRect().top < window.innerHeight * 0.8;
      var show = y > heroEnd && !nearEnd;
      floating.classList.toggle('is-visible', show);
      floating.setAttribute('aria-hidden', show ? 'false' : 'true');
      floating.tabIndex = show ? 0 : -1;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu Mobile ---------- */
  if (menuBtn && nav) {
    function setMenu(open) {
      document.body.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      var use = menuBtn.querySelector('use');
      if (use) use.setAttribute('href', open ? '#i-close' : '#i-menu');
    }

    menuBtn.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('menu-open'));
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setMenu(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  /* ---------- Destacar link do menu conforme a seção ---------- */
  if (nav && 'IntersectionObserver' in window) {
    var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = '#' + entry.target.id;
          navLinks.forEach(function (l) {
            l.classList.toggle('is-active', l.getAttribute('href') === id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    navLinks.forEach(function (l) {
      var target = document.querySelector(l.getAttribute('href'));
      if (target) sectionObserver.observe(target);
    });
  }

  /* ---------- FAQ Animado (Abre uma de cada vez) ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canAnimate = typeof document.body.animate === 'function';
  var faqItems = document.querySelectorAll('#faq details');

  faqItems.forEach(function (item) {
    var summary = item.querySelector('summary');
    if (!summary) return;

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      var willOpen = !item.open;

      // Fecha as outras
      faqItems.forEach(function (other) {
        if (other !== item && other.open) closeItem(other);
      });

      if (willOpen) openItem(item);
      else closeItem(item);
    });

    function openItem(el) {
      el.open = true;
      if (reduceMotion || !canAnimate) return;
      var b = el.querySelector('.faq-body');
      if (!b) return;
      var h = b.scrollHeight;
      b.animate(
        [
          { height: '0px', opacity: 0 },
          { height: h + 'px', opacity: 1 }
        ],
        { duration: 280, easing: 'ease' }
      );
    }

    function closeItem(el) {
      if (reduceMotion || !canAnimate) {
        el.open = false;
        return;
      }
      var b = el.querySelector('.faq-body');
      if (!b) {
        el.open = false;
        return;
      }
      var anim = b.animate(
        [
          { height: b.scrollHeight + 'px', opacity: 1 },
          { height: '0px', opacity: 0 }
        ],
        { duration: 220, easing: 'ease' }
      );
      anim.onfinish = function () {
        el.open = false;
      };
    }
  });

  /* ---------- Abertura Cortina (Intro) & Carregamento do Topo ---------- */
  var intro = document.getElementById('intro');

  function startHero() {
    document.body.classList.add('is-loaded');
  }

  if (reduceMotion || !intro) {
    if (intro) intro.remove();
    startHero();
  } else {
    document.body.style.overflow = 'hidden';
    var introDone = false;

    var finishIntro = function () {
      if (introDone) return;
      introDone = true;
      intro.classList.add('is-done');
      document.body.style.overflow = '';
      setTimeout(startHero, 150);
      setTimeout(function () {
        intro.remove();
      }, 800);
    };

    var heroImg = document.querySelector('.hero-photo');
    var minTime = new Promise(function (r) {
      setTimeout(r, 700);
    });
    var imgReady = new Promise(function (r) {
      if (!heroImg || heroImg.complete) r();
      else {
        heroImg.addEventListener('load', r);
        heroImg.addEventListener('error', r);
      }
    });

    Promise.all([minTime, imgReady]).then(finishIntro);
    setTimeout(finishIntro, 1600);
  }

  /* ---------- Barra de Progresso Superior ---------- */
  var progress = document.getElementById('progress');
  var ticking = false;

  function onFrame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) {
      progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    }
  }

  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onFrame);
      }
    },
    { passive: true }
  );
  onFrame();

  /* ---------- Brilho que segue o mouse nos cartões ---------- */
  document.querySelectorAll('.card').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', e.clientX - r.left + 'px');
      el.style.setProperty('--my', e.clientY - r.top + 'px');
    });
  });

  /* ---------- Animação de Entrada ao Rolar (Reveals) ---------- */
  var reveals = document.querySelectorAll('.reveal, .img-reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });

    var photoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll('.img-reveal').forEach(function (img) {
            img.classList.add('is-in');
          });
          photoObserver.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    document.querySelectorAll('.img-reveal').forEach(function (el) {
      photoObserver.observe(el.parentElement || el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  /* ---------- Vídeos Reels Interativos com Reprodução Exclusiva ----------
     Regra: Um vídeo só pode ser reproduzido se o outro estiver pausado. */
  var reels = Array.prototype.slice.call(document.querySelectorAll('.reel'));

  function atualizarBotaoPlay(r, tocando) {
    var pBtn = r.querySelector('.reel-play-btn');
    if (!pBtn) return;
    var use = pBtn.querySelector('use');
    if (use) use.setAttribute('href', tocando ? '#i-pause' : '#i-play');
    pBtn.setAttribute('aria-label', tocando ? 'Pausar vídeo' : 'Reproduzir vídeo');
  }

  function mutarOutros(videoComSom) {
    reels.forEach(function (r) {
      var ov = r.querySelector('video');
      var obtn = r.querySelector('.reel-vol-btn');
      if (ov && ov !== videoComSom) {
        ov.muted = true;
        if (obtn) {
          var ouse = obtn.querySelector('use');
          if (ouse) ouse.setAttribute('href', '#i-sound-off');
          obtn.setAttribute('aria-label', 'Ligar som');
        }
      }
    });
  }

  function pausarOutros(videoAtivo) {
    reels.forEach(function (r) {
      var v = r.querySelector('video');
      if (v && v !== videoAtivo) {
        v.pause();
        r.classList.remove('is-playing');
        r.classList.add('is-paused');
        atualizarBotaoPlay(r, false);
      }
    });
  }

  reels.forEach(function (reel) {
    var v = reel.querySelector('video');
    var playBtn = reel.querySelector('.reel-play-btn');
    var volBtn = reel.querySelector('.reel-vol-btn');
    var volSlider = reel.querySelector('.reel-vol-slider');
    var ph = reel.querySelector('.reel-ph');

    if (!v) return;

    // Quando o vídeo começa a reproduzir: pausa imediatamente os outros
    v.addEventListener('play', function () {
      pausarOutros(v);
      reel.classList.remove('is-paused');
      reel.classList.add('is-playing');
      reel.classList.add('is-ready');
      atualizarBotaoPlay(reel, true);
    });

    // Quando o vídeo pausa
    v.addEventListener('pause', function () {
      reel.classList.remove('is-playing');
      reel.classList.add('is-paused');
      atualizarBotaoPlay(reel, false);
    });

    // Botão de Play / Pause no Canto Inferior Esquerdo
    if (playBtn) {
      playBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (v.paused) {
          pausarOutros(v);
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }

    // Clique na área do vídeo para alternar Play / Pause
    reel.addEventListener('click', function (e) {
      // Ignora cliques no botão de play ou no controle de volume
      if (e.target.closest('.reel-play-btn') || e.target.closest('.reel-vol-ctrl')) return;

      if (v.paused) {
        pausarOutros(v);
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      } else {
        v.pause();
      }
    });

    // Clique no placeholder de play inicial
    if (ph) {
      ph.addEventListener('click', function (e) {
        e.stopPropagation();
        pausarOutros(v);
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      });
    }

    // Slider de Aumentar / Diminuir Volume
    if (volSlider) {
      volSlider.addEventListener('click', function (e) {
        e.stopPropagation();
      });

      volSlider.addEventListener('input', function (e) {
        e.stopPropagation();
        var val = parseFloat(volSlider.value);
        v.volume = val;

        if (val === 0) {
          v.muted = true;
          if (volBtn) {
            var use = volBtn.querySelector('use');
            if (use) use.setAttribute('href', '#i-sound-off');
            volBtn.setAttribute('aria-label', 'Ligar som');
          }
        } else {
          v.muted = false;
          mutarOutros(v);
          if (volBtn) {
            var useOn = volBtn.querySelector('use');
            if (useOn) useOn.setAttribute('href', '#i-sound-on');
            volBtn.setAttribute('aria-label', 'Desligar som');
          }
        }
      });
    }

    // Botão de Mutar / Desmutar Áudio
    if (volBtn) {
      volBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        v.muted = !v.muted;

        if (!v.muted) {
          if (v.volume === 0) {
            v.volume = 0.8;
            if (volSlider) volSlider.value = 0.8;
          }
          mutarOutros(v);

          // Se estiver pausado ao ligar som, inicia a reprodução
          if (v.paused) {
            pausarOutros(v);
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          }
        }

        var use = volBtn.querySelector('use');
        if (use) {
          use.setAttribute('href', v.muted ? '#i-sound-off' : '#i-sound-on');
        }
        volBtn.setAttribute('aria-label', v.muted ? 'Ligar som' : 'Desligar som');
      });
    }
  });

  // Autoplay inteligente no scroll: toca apenas 1 vídeo por vez
  if (reels.length && 'IntersectionObserver' in window) {
    var videoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target.querySelector('video');
          if (!v) return;

          if (entry.isIntersecting) {
            entry.target.classList.add('is-ready');
            // Só toca automaticamente se nenhum outro vídeo já estiver tocando
            var algumTocando = reels.some(function (r) {
              var ov = r.querySelector('video');
              return ov && !ov.paused;
            });

            if (!algumTocando) {
              var p = v.play();
              if (p && p.catch) p.catch(function () {});
            }
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    reels.forEach(function (r) {
      videoObserver.observe(r);
    });
  }
})();
