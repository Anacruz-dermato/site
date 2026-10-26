import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, X, ArrowUpRight, Star } from 'lucide-react';
import './styles.css';

const asset=(name)=>`${import.meta.env.BASE_URL}assets/${name}`;
const img={
 hero:'figma-55-4-img01HeroFotografiaPrincipalHeadlineECta.png', logo:'figma-55-4-imgCamada1.svg', whatsapp:'f8700994-b401-4574-9f1a-426f3271c0db.svg',
 about:'728ccb39-75c3-4aa5-86f3-2780231d6f82.png', nature:'aa20994c-bad4-45ee-a24a-39435ee3abff.png', aging:'aging-consultation-55-741.png',
 reviews:'119b6a46-07ae-4d55-8048-1dcb082fbd3c.png', google:'882cdcb4-8f64-48f6-a3b8-62334b836cf5.png', clinic1:'af8db187-0d06-4576-a157-e7b164f69874.png',clinic2:'f572fbb0-feb9-4038-b459-892302340097.png',clinic3:'411369fb-2cd2-491d-a081-e3207b4efee5.png', clinic4:'b881abec-5232-46dd-8384-1d6121532d6c.png', final:'e5acd995-26fc-4131-93f6-6892bcf651ec.png'
};
const treatments=[
 ['Preenchimento e harmonização facial','Valorização dos traços e definição dos contornos, com planejamento individualizado.','26bc7411-80b3-48ed-bfc0-b29b7b478f42.png'],
 ['Toxina botulínica','Suavização de linhas de expressão, preservando a naturalidade e a expressividade.','d45f9999-43bf-4151-99f3-298d41c2c00a.png'],
 ['Fios de PDO','Fios absorvíveis que podem estimular colágeno e contribuir para a firmeza da pele.','6942119a-32d8-47e0-9743-9ac0e56c1aea.png'],
 ['Bioestimuladores de colágeno','Estímulo gradual do colágeno para apoiar firmeza, elasticidade e qualidade da pele.','373e6a63-b0a5-46e6-a559-7d46e604bcdd.png'],
 ['Tratamentos capilares','Avaliação da saúde do couro cabeludo e dos fios, com opções definidas caso a caso.','d9fc18a0-c911-45ea-b1f8-166bbad2ac35.png'],
 ['Gordura localizada','Abordagens para contorno corporal em regiões como papada, abdômen, braços e flancos.','ec6cc833-dad3-4b09-8755-93a727abb19e.png'],
 ['Flacidez facial e corporal','Tecnologias e técnicas para apoiar a firmeza e a elasticidade da pele do rosto e do corpo.','956d37f0-3ad5-4934-87d3-c14c5e6977bc.png'],
 ['Pequenas cirurgias dermatológicas','Avaliação de sinais, cistos e outras alterações da pele, quando houver indicação clínica.','c35c5a52-feaf-4109-a065-aaed8e2f30f9.png'],
 ['Consulta dermatológica','Avaliação da pele, investigação de queixas e orientação de cuidados individualizados.','378e2324-0201-40f4-bf56-a46361e92707.png'],
 ['Rotina e cuidados com a pele','Orientação para desenvolver uma rotina compatível com as características da sua pele.','6b5a3b92-8118-4531-b614-f06775fcd402.png'],
 ['Procedimentos estéticos em geral','Peelings, hidratações, microagulhamento e outros cuidados selecionados individualmente.','93e01a77-f957-4aa4-8cae-cbb817116ac2.png'],
 ['Lasers e tecnologias','Tecnologias escolhidas para manchas, cicatrizes, rugas e outras alterações cutâneas.','363da3e7-2596-4d64-85b5-4585401258df.png']
];
const treatmentDetails=["Valorize sua beleza natural com o preenchimento e a harmonização facial, técnicas que utilizam ácido hialurônico para realçar seus traços e criar um rosto equilibrado e harmônico. Ideal para suavizar olheiras profundas, aumentar os lábios, corrigir o formato do nariz, redefinir o contorno da mandíbula e muito mais. A Dra. Ana Cruz personaliza cada tratamento de acordo com as características individuais de seus pacientes, garantindo resultados naturais e elegantes.", "Elimine rugas e linhas de expressão sem perder a naturalidade! O Botox é uma técnica consagrada para relaxar os músculos que causam marcas na pele, como rugas na testa, entre as sobrancelhas, ao redor dos olhos, contorno do rosto e pescoço. Além disso, ele é usado preventivamente para evitar a formação de novas linhas. A Dra. Ana Cruz realiza o procedimento com precisão milimétrica, priorizando a segurança e o bem-estar de cada paciente, com resultados que respeitam sua beleza única.", "Dê um efeito lifting imediato à sua pele com os inovadores fios de PDO! Esses fios absorvíveis são introduzidos na pele para estimular o colágeno e devolver a firmeza, sendo indicados para levantar e redefinir o contorno da mandíbula, das maçãs do rosto e do pescoço.", "Redefina a firmeza e a elasticidade da sua pele com tratamentos que ativam seu próprio colágeno. Utilizando bioestimuladores de colágeno, a Dra. Ana Cruz reverte os sinais de envelhecimento, combatendo a flacidez de áreas como rosto, pescoço, braços, abdômen, glúteos, joelhos e parte interna das coxas. Esses produtos agem profundamente, proporcionando uma pele mais firme, lisa e jovem ao longo do tempo. É o rejuvenescimento gradual que você sempre quis!", "Recupere a saúde do seu couro cabeludo e estimule o crescimento de fios mais fortes e densos. A Dra. Ana Cruz oferece um conjunto de soluções avançadas, como terapias com vitaminas injetáveis, microagulhamento capilar e lasers específicos para tratar calvície e queda de cabelo. Após uma avaliação personalizada, cada tratamento é ajustado às necessidades individuais do paciente, promovendo resultados visíveis e duradouros.", "Elimine gorduras localizadas de maneira eficaz e sem cirurgia! Os esvaziadores de gordura, como enzimas lipolíticas, atuam diretamente nas células de gordura, reduzindo medidas em áreas como papada, abdômen, braços e flancos. A Dra. Ana Cruz utiliza técnicas modernas e seguras, com resultados graduais que redefinem seu contorno corporal.", "Combata a flacidez com tecnologias de ponta e técnicas avançadas! A Dra. Ana Cruz utiliza métodos como ultrassom microfocado, radiofrequência e bioestimuladores de colágeno para restaurar a firmeza da pele em regiões como rosto, pescoço, abdômen e coxas. Esses tratamentos são não invasivos e promovem resultados visíveis, melhorando a textura e a elasticidade da pele.", "Cuide da sua saúde dermatológica com precisão e segurança. A Dra. Ana Cruz realiza a remoção de sinais, cistos, lipomas e outras lesões de pele utilizando técnicas minimamente invasivas, garantindo um processo rápido e com recuperação tranquila. Com anos de experiência, ela prioriza resultados estéticos e funcionais, para que você se sinta confiante e à vontade em cada etapa.", "A consulta dermatológica é um espaço para compreender suas queixas e avaliar a saúde da pele, dos cabelos e das unhas. A partir do histórico e do exame clínico, são definidos os cuidados, a necessidade de exames e um plano de acompanhamento personalizado.", "Uma rotina de cuidados deve acompanhar as características e as necessidades da sua pele. Limpeza, hidratação e proteção solar são orientadas de forma individual, com seleção de produtos e ativos que façam sentido para sua rotina e seus objetivos.", "Renove sua pele com procedimentos estéticos personalizados! A Dra. Ana Cruz oferece uma ampla gama de tratamentos, como peeling químico, hidratações profundas e microagulhamento. Esses procedimentos melhoram a textura, o tom e o brilho da pele, proporcionando um aspecto jovem e saudável.", "Transforme a sua pele com tecnologias avançadas! A Dra. Ana Cruz utiliza equipamentos de última geração, com diversas opções de lasers e tecnologias, para tratar manchas, cicatrizes, rugas e flacidez. Cada procedimento é ajustado ao perfil do paciente, buscando os melhores resultados e uma pele radiante."];
const principles=[['Naturalidade','Valorizar os traços individuais e buscar resultados equilibrados, respeitando a identidade de cada paciente.','4e72c03d-6d0c-4ab0-8d5c-cf2f03fd90aa.svg'],['Individualidade','Compreender as particularidades de cada pessoa para orientar tratamentos adequados às suas necessidades.','1a78ac39-e75b-45ac-9a6e-74787805a183.svg'],['Cuidado integral','Considerar a saúde da pele, a estética, o bem-estar e a autoestima em uma abordagem personalizada.','b96e8fca-201e-44ee-adb6-5d50a7456f43.svg']];
const reviews=[{"id": "55:4653", "assets": {"imgImage7": "https://www.figma.com/api/mcp/asset/7164afcd-4d22-420d-9157-4ac2c204eb55.png", "imgGroup": "https://www.figma.com/api/mcp/asset/a4548fd1-75f9-496c-8b1f-dc48e2d6c3ab.svg", "imgGroup1": "https://www.figma.com/api/mcp/asset/49fe68e3-f416-427d-82ef-03735cbd4403.svg", "imgGroup2": "https://www.figma.com/api/mcp/asset/e191bbd3-0d78-480e-85b2-81b52d4f56de.svg", "imgGroup3": "https://www.figma.com/api/mcp/asset/fc267f36-6f41-477d-b5b1-c95663afe692.svg", "imgGroup4": "https://www.figma.com/api/mcp/asset/1eefe81d-0ee8-4af2-8ee8-7b541b969fe0.svg"}, "name": "Luiz Guilherme Galvão", "copy": "Gostei bastante da consulta com a Dra. Ana. Muito atenciosa, explica tudo com calma e passa bastante segurança. Fez uma avaliação detalhada e foi bem sincera sobre os tratamentos. Atendimento excelente, recomendo.", "initial": null, "prefix": "reviews-figma/55-4653", "color": ""}, {"id": "55:3620", "assets": {"imgImage7": "https://www.figma.com/api/mcp/asset/7c86cece-d44d-4ae1-89a7-3f1fcc12612b.png", "imgGroup": "https://www.figma.com/api/mcp/asset/9ad58787-9cc6-4bce-a1c3-38e8bc7df763.svg", "imgGroup1": "https://www.figma.com/api/mcp/asset/0e213a11-1057-4ed0-b1f0-f1ae511383e5.svg", "imgGroup2": "https://www.figma.com/api/mcp/asset/843da794-3842-4fe5-af9f-f123c14bf462.svg", "imgGroup3": "https://www.figma.com/api/mcp/asset/e890ba91-5b47-465a-9ca1-d7aeffa6971e.svg", "imgGroup4": "https://www.figma.com/api/mcp/asset/b679b859-7c6c-45d8-9dae-9284b74c5d2d.svg"}, "name": "Emily Giovana", "copy": "Dra Ana sempre muito atenciosa e atenta aos detalhes. Deixando sempre o paciente muito à vontade, respeitando cada pedido. Amo o método dela, sempre muito natural. A maior afirmação que eu tenho é quando me dizem “Você está tão linda, mas não sei dizer o que você fez”. Procedimento bem feito é quando você realça a beleza, sem perder a naturalidade. 😍", "initial": null, "prefix": "reviews-figma/55-3620", "color": ""}, {"id": "55:4760", "assets": {"imgImage7": "https://www.figma.com/api/mcp/asset/53ec46d0-f9cf-4c16-b17e-8d5ca87221a1.png", "imgGroup": "https://www.figma.com/api/mcp/asset/fce66908-f37e-40f0-aa56-b51cf57ca59f.svg", "imgGroup1": "https://www.figma.com/api/mcp/asset/2ef06884-99e0-49bd-8359-6d8675617087.svg", "imgGroup2": "https://www.figma.com/api/mcp/asset/97730f3b-5bcd-4dfe-94e5-35c33f06bd2c.svg", "imgGroup3": "https://www.figma.com/api/mcp/asset/cac7e302-1160-4564-bfb5-f8bd495159e1.svg", "imgGroup4": "https://www.figma.com/api/mcp/asset/9d9466d1-100d-46de-9ffb-f5d198052280.svg"}, "name": "Alex Parreira", "copy": "Dr. Ana Cruz extremamente competente e cordial, cheguei até ela por uma indicação, e fui muito feliz em todos tratamentos, além de passar muita segurança pra gente em suas consultas.\nSem dúvidas, eu indicaria ela tbm.", "initial": "A", "prefix": "reviews-figma/55-4760", "color": "#419213"}, {"id": "55:5293", "assets": {"imgImage7": "https://www.figma.com/api/mcp/asset/5e5cee35-6c8e-4e87-80ee-3dd11068dd90.png", "imgGroup": "https://www.figma.com/api/mcp/asset/560282a2-b8f4-40b5-ba6b-a536b1f1c288.svg", "imgGroup1": "https://www.figma.com/api/mcp/asset/f112544c-313c-46cc-a6ee-5b3a92242dc1.svg", "imgGroup2": "https://www.figma.com/api/mcp/asset/5f8dede6-4413-4c97-98fe-670ae3ae129c.svg", "imgGroup3": "https://www.figma.com/api/mcp/asset/d797a8f1-330c-4a34-bef1-0368c81107f4.svg", "imgGroup4": "https://www.figma.com/api/mcp/asset/0028c31e-7b76-458c-b008-0a551ef4285d.svg"}, "name": "Tayse de Freitas Branco Pereira", "copy": "A dra Ana Paula é super cuidadosa e competente, eu gosto de procedimentos mais naturais e esse é o estilo e foco dela tbm! Eu também tenho muita sensibilidade a dor e com com a dra Ana os procedimentos são super toleráveis, tem uns que nem senti nada!!", "initial": "T", "prefix": "reviews-figma/55-5293", "color": "#132c92"}, {"id": "55:5400", "assets": {"imgImage7": "https://www.figma.com/api/mcp/asset/d8bd6fc6-46c0-47b5-80ea-38659e468f5c.png", "imgGroup": "https://www.figma.com/api/mcp/asset/d4d46915-e305-4759-b941-7d41fa61fbbc.svg", "imgGroup1": "https://www.figma.com/api/mcp/asset/6b0065eb-73d6-4c5d-8ad9-7e840314a5bb.svg", "imgGroup2": "https://www.figma.com/api/mcp/asset/0acdfb74-94b1-41f3-8516-bf7040b7ca0b.svg", "imgGroup3": "https://www.figma.com/api/mcp/asset/82acb1d3-3167-42b8-bd8a-a862b706087e.svg", "imgGroup4": "https://www.figma.com/api/mcp/asset/858ee77d-31a0-43dd-9eb8-164d2cba5a5f.svg"}, "name": "Diana Arantes", "copy": "Amo a doutora Ana Paula. Muito profissional e necessária, te prescreve o que realmente é preciso, não fica te enfiando coisas caras só pra vender como em muitos lugares que já fui! Faço tratamento constante de melasma com ela, e o resultado é incrível 😍 Recomendo ela de olhos fechados!!!", "initial": null, "prefix": "reviews-figma/55-5400", "color": ""}, {"id": "55:5506", "assets": {"imgImage7": "https://www.figma.com/api/mcp/asset/37ba5755-3b1d-4120-abb7-59160f9a861d.png", "imgGroup": "https://www.figma.com/api/mcp/asset/aaba80f9-a419-4e07-a3a9-c31d3208f678.svg", "imgGroup1": "https://www.figma.com/api/mcp/asset/e6a75197-6be3-4328-b7c8-41a8969833f7.svg", "imgGroup2": "https://www.figma.com/api/mcp/asset/441d35ae-0404-491f-aaaa-cc3cdc4ef079.svg", "imgGroup3": "https://www.figma.com/api/mcp/asset/0857684d-d3eb-46f2-bd9f-06b7a57e0ec5.svg", "imgGroup4": "https://www.figma.com/api/mcp/asset/629bd1d7-c7c8-4d1e-b584-66b2ae8450b1.svg"}, "name": "Debora Almeida", "copy": "Dra. Ana é maravilhosa, super cuidadosa, detalhista, um amor de pessoa, profissional excelente, indico de olhos fechados!", "initial": "D", "prefix": "reviews-figma/55-5506", "color": "#138c92"}, {"id": "55:5612", "assets": {"imgImage7": "https://www.figma.com/api/mcp/asset/d61bd0c2-67fb-4968-9c27-d45314531f40.png", "imgGroup": "https://www.figma.com/api/mcp/asset/94b54150-0d89-461b-bc86-67d2806c18f5.svg", "imgGroup1": "https://www.figma.com/api/mcp/asset/cef4d74a-ca6a-4109-8ab9-ded8df419e12.svg", "imgGroup2": "https://www.figma.com/api/mcp/asset/402cf7fd-d3e4-4956-a71f-91561ed29e1d.svg", "imgGroup3": "https://www.figma.com/api/mcp/asset/8bda94ec-c6a3-4f6c-a392-4ace56d1e05d.svg", "imgGroup4": "https://www.figma.com/api/mcp/asset/f32767e9-7b3a-4f03-907d-c98e47e8f27d.svg"}, "name": "Aline Freitas", "copy": "Dra Ana é excelente profissional! Super recomendo", "initial": "D", "prefix": "reviews-figma/55-5612", "color": "#138c92"}];
const clinicSlides=[
 ['Consultório particular — sala de espera','clinic-original-55-1214.png'],
 ['Consultório particular — sala de atendimento','clinic-original-55-1215.png'],
 ['Consultório particular — sala de procedimentos','clinic-original-55-1216.png'],
 ['Clínica Kiseki — sala de espera','clinic-original-55-1217.png']
];
const clinicAddress='Rua Bandeira Paulista, 530, 9º andar, Itaim Bibi, São Paulo, SP';
const googleMapsEmbedUrl=`https://www.google.com/maps?q=${encodeURIComponent(clinicAddress)}&z=16&output=embed`;
const nav=[['Início','#inicio'],['Atuação','#atuacao'],['Sobre mim','#sobre'],['Tratamentos','#tratamentos'],['Depoimentos','#depoimentos'],['Consultório','#consultorio']];
function WhatsApp({className='',icon=img.whatsapp}){return <a className={`button button-gold ${className}`} href="https://wa.me/5511974540434" aria-label="Agendar minha consulta pelo WhatsApp"><img src={asset(icon)} alt=""/>Agendar minha consulta</a>}
function ScrollControls({scrollerRef,label}){const [position,setPosition]=useState({hasOverflow:false,atStart:true,atEnd:true});useEffect(()=>{const el=scrollerRef.current;if(!el)return;const update=()=>setPosition({hasOverflow:el.scrollWidth>el.clientWidth+1,atStart:el.scrollLeft<=1,atEnd:el.scrollLeft+el.clientWidth>=el.scrollWidth-1});update();el.addEventListener('scroll',update,{passive:true});const observer=new ResizeObserver(update);observer.observe(el);Array.from(el.children).forEach(child=>observer.observe(child));return()=>{el.removeEventListener('scroll',update);observer.disconnect()}},[scrollerRef]);if(!position.hasOverflow)return null;const move=(direction)=>{const el=scrollerRef.current;if(el)el.scrollBy({left:direction*Math.max(el.clientWidth*.8,240),behavior:'smooth'})};return <div className="scroll-controls" role="group" aria-label={`Controles de rolagem: ${label}`}><button type="button" className="scroll-control" aria-label={`Rolar ${label} para a esquerda`} disabled={position.atStart} onClick={()=>move(-1)}><img src={asset('scroll-arrow-left-figma.svg')} alt=""/></button><button type="button" className="scroll-control" aria-label={`Rolar ${label} para a direita`} disabled={position.atEnd} onClick={()=>move(1)}><img src={asset('scroll-arrow-right-figma.svg')} alt=""/></button></div>}
function Navigation(){
 const [open,setOpen]=useState(false);
 const [active,setActive]=useState('#inicio');
 const [scrolled,setScrolled]=useState(false);
 const linksRef=useRef(null);
 const overlayRef=useRef(null);
 const instantRef=useRef(false);
 useEffect(()=>{
  let frame=0;
  const update=()=>{
   frame=0;
   const sections=nav.map(([,href])=>({href,el:document.querySelector(href)})).filter(item=>item.el).sort((a,b)=>a.el.offsetTop-b.el.offsetTop);
   const marker=window.innerHeight*.3;
   let current='#inicio';
   for(const section of sections){if(section.el.getBoundingClientRect().top<=marker)current=section.href;}
   setActive(current);setScrolled(window.scrollY>80);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
 },[]);
 useLayoutEffect(()=>{
  const update=()=>{
   const list=linksRef.current,overlay=overlayRef.current;
   const link=list?.querySelector(`[href="${active}"]`);
   if(!link||!overlay)return;
   overlay.style.transitionDuration=instantRef.current?'0ms':'';
   overlay.style.clipPath=`inset(${link.offsetTop}px ${Math.max(0,list.clientWidth-link.offsetLeft-link.offsetWidth)}px ${Math.max(0,list.clientHeight-link.offsetTop-link.offsetHeight)}px ${link.offsetLeft}px round 28px)`;
   instantRef.current=false;
  };
  update();const observer=new ResizeObserver(update);observer.observe(linksRef.current);
  return()=>observer.disconnect();
 },[active,open]);
 return <nav className={`nav${scrolled?' is-scrolled':''}`} aria-label="Navegação principal">
  <a href="#inicio" className="nav-logo"><img src={asset(img.logo)} alt="Ana Cruz"/></a>
  <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} aria-controls="primary-navigation">{open?<X/>:<Menu/>}</button>
  <div id="primary-navigation" ref={linksRef} className={`nav-links ${open?'is-open':''}`}>
   {nav.map(([label,href])=><a key={href} href={href} aria-current={active===href?'location':undefined} onClick={event=>{instantRef.current=event.detail===0;setActive(href);setOpen(false);}}>{label}</a>)}
   <div ref={overlayRef} className="nav-active-overlay" aria-hidden="true">{nav.map(([label,href])=><span key={href}>{label}</span>)}</div>
  </div>
 </nav>;
}
// Avança um depoimento por vez, devagar; qualquer interação pausa e o leitor nunca disputa o controle com a animação.
function useAutoAdvance(ref,{interval=5200,duration=700,idle=7000}={}){
 useEffect(()=>{
  const rail=ref.current;
  if(!rail||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const section=rail.closest('section');
  let timer=0,frame=0,visible=false,hovering=false,focused=false,animating=false,resumeAt=0;
  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  const glide=to=>{
   const from=rail.scrollLeft,start=performance.now();
   animating=true;rail.style.scrollSnapType='none';
   const step=now=>{
    const t=Math.min(1,(now-start)/duration);
    rail.scrollLeft=from+(to-from)*ease(t);
    if(t<1)frame=requestAnimationFrame(step);
    else{animating=false;rail.style.scrollSnapType='';}
   };
   frame=requestAnimationFrame(step);
  };
  const advance=()=>{
   const max=rail.scrollWidth-rail.clientWidth;
   if(max<=0)return;
   const cards=[...rail.children];
   const next=cards.map(card=>card.offsetLeft-cards[0].offsetLeft).find(left=>left>rail.scrollLeft+4);
   glide(rail.scrollLeft>=max-4||next===undefined?0:Math.min(next,max));
  };
  const schedule=()=>{
   clearTimeout(timer);
   if(!visible||hovering||focused||document.hidden)return;
   timer=setTimeout(()=>{if(Date.now()<resumeAt)return schedule();advance();schedule();},Math.max(interval,resumeAt-Date.now()));
  };
  const interrupt=()=>{cancelAnimationFrame(frame);if(animating){animating=false;rail.style.scrollSnapType='';}resumeAt=Date.now()+idle;schedule();};
  const onScroll=()=>{if(!animating)interrupt();};
  const onEnter=event=>{if(event.pointerType==='mouse'){hovering=true;clearTimeout(timer);}};
  const onLeave=event=>{if(event.pointerType==='mouse'){hovering=false;schedule();}};
  const onFocus=()=>{focused=!!section.querySelector(':focus-visible');schedule();};const onBlur=()=>setTimeout(onFocus);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule();},{threshold:.35});
  observer.observe(rail);
  rail.addEventListener('scroll',onScroll,{passive:true});
  rail.addEventListener('pointerenter',onEnter);rail.addEventListener('pointerleave',onLeave);
  ['pointerdown','wheel','touchstart'].forEach(type=>rail.addEventListener(type,interrupt,{passive:true}));
  section.addEventListener('click',interrupt);section.addEventListener('focusin',onFocus);section.addEventListener('focusout',onBlur);
  document.addEventListener('visibilitychange',schedule);
  return()=>{clearTimeout(timer);cancelAnimationFrame(frame);observer.disconnect();rail.style.scrollSnapType='';rail.removeEventListener('scroll',onScroll);rail.removeEventListener('pointerenter',onEnter);rail.removeEventListener('pointerleave',onLeave);['pointerdown','wheel','touchstart'].forEach(type=>rail.removeEventListener(type,interrupt));section.removeEventListener('click',interrupt);section.removeEventListener('focusin',onFocus);section.removeEventListener('focusout',onBlur);document.removeEventListener('visibilitychange',schedule);};
 },[ref,interval,duration,idle]);
}
// Consentimento de cookies (LGPD): guardado no navegador; sem registro, o banner aparece na primeira visita ou após limpar os dados do site.
const CONSENT_KEY='dra-ana-cruz-cookies';
const CONSENT_VERSION=2;
const readConsent=()=>{try{const value=JSON.parse(localStorage.getItem(CONSENT_KEY));return value?.version>=CONSENT_VERSION?value:null}catch{return null}};
const consentStore={value:readConsent(),subs:new Set(),set(next){this.value={...next,date:new Date().toISOString(),version:CONSENT_VERSION};try{localStorage.setItem(CONSENT_KEY,JSON.stringify(this.value))}catch{}this.subs.forEach(fn=>fn(this.value));}};
// Google Analytics só é baixado depois do consentimento; ao revogar, desliga o envio e apaga os cookies _ga.
const GA_ID='G-SM16SM0JPN';
const clearAnalyticsCookies=()=>{const parts=location.hostname.split('.');const domains=['',...parts.slice(0,-1).map((_,i)=>parts.slice(i).join('.'))];document.cookie.split(';').map(c=>c.split('=')[0].trim()).filter(n=>n.startsWith('_ga')).forEach(n=>domains.forEach(d=>{document.cookie=`${n}=; Max-Age=0; path=/${d?`; domain=${d}`:''}`}))};
const syncAnalytics=consent=>{
 window[`ga-disable-${GA_ID}`]=!consent?.analytics;
 if(!consent?.analytics){clearAnalyticsCookies();return}
 if(window.gtag){window.gtag('config',GA_ID);return}
 window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config',GA_ID);
 const script=document.createElement('script');script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;document.head.appendChild(script);
};
syncAnalytics(consentStore.value);consentStore.subs.add(syncAnalytics);
function useConsent(){const [value,setValue]=useState(consentStore.value);useEffect(()=>{consentStore.subs.add(setValue);return()=>consentStore.subs.delete(setValue)},[]);return value}
const openLegal=name=>window.dispatchEvent(new CustomEvent('open-legal',{detail:name}));
function LegalDialog({name,title,children}){
 const ref=useRef(null);
 useEffect(()=>{const open=event=>{if(event.detail===name&&!ref.current.open)ref.current.showModal()};window.addEventListener('open-legal',open);return()=>window.removeEventListener('open-legal',open)},[name]);
 return <dialog ref={ref} className="legal-dialog" aria-labelledby={`${name}-title`} onClick={event=>{if(event.target===ref.current)ref.current.close()}}>
  <div className="legal-dialog-inner">
   <header className="legal-dialog-header"><h2 id={`${name}-title`}>{title}</h2><button type="button" className="legal-close" onClick={()=>ref.current.close()} aria-label="Fechar"><X/></button></header>
   {children(()=>ref.current.close())}
  </div>
 </dialog>;
}
function CookieConsent(){
 const consent=useConsent();
 const [maps,setMaps]=useState(consent?.maps??false);
 const [analytics,setAnalytics]=useState(consent?.analytics??false);
 useEffect(()=>{setMaps(consent?.maps??false);setAnalytics(consent?.analytics??false)},[consent]);
 return <>
  {!consent&&<section className="cookie-banner" role="region" aria-label="Aviso de cookies">
   <p><strong>Sua privacidade importa.</strong> Usamos cookies para melhorar sua experiência no site. Saiba mais na <button type="button" className="text-link" onClick={()=>openLegal('privacy')}>Política de Privacidade</button>.</p>
   <div className="cookie-actions">
    <button type="button" className="cookie-button cookie-primary" onClick={()=>consentStore.set({necessary:true,analytics:true,maps:true})}>Aceitar todos</button>
    <button type="button" className="cookie-button" onClick={()=>consentStore.set({necessary:true,analytics:false,maps:false})}>Somente essenciais</button>
    <button type="button" className="cookie-button" onClick={()=>openLegal('cookies')}>Personalizar</button>
   </div>
  </section>}
  <LegalDialog name="cookies" title="Preferências de cookies">{close=><>
   <div className="legal-body">
    <p>Escolha quais cookies podem ser usados neste site. Você pode mudar sua escolha a qualquer momento pela Política de Privacidade, no rodapé.</p>
    <label className="cookie-option"><span><strong>Essenciais</strong>Guardam suas preferências de privacidade e garantem o funcionamento básico do site. Não podem ser desativados.</span><input type="checkbox" checked disabled/></label>
    <label className="cookie-option"><span><strong>Estatísticas (Google Analytics)</strong>Medem de forma agregada as visitas e as páginas acessadas, para melhorarmos o site. O Google pode definir cookies e coletar dados de navegação conforme a política dele.</span><input type="checkbox" checked={analytics} onChange={event=>setAnalytics(event.target.checked)}/></label>
    <label className="cookie-option"><span><strong>Mapas de terceiros (Google Maps)</strong>Exibem o mapa interativo do consultório. O Google pode definir cookies e coletar dados de navegação conforme a política dele.</span><input type="checkbox" checked={maps} onChange={event=>setMaps(event.target.checked)}/></label>
   </div>
   <div className="legal-actions">
    <button type="button" className="cookie-button" onClick={()=>{consentStore.set({necessary:true,analytics:false,maps:false});close()}}>Somente essenciais</button>
    <button type="button" className="cookie-button cookie-primary" onClick={()=>{consentStore.set({necessary:true,analytics,maps});close()}}>Salvar preferências</button>
   </div>
  </>}</LegalDialog>
 </>;
}
function PrivacyPolicy(){
 return <LegalDialog name="privacy" title="Política de Privacidade">{()=><div className="legal-body">
  <p className="legal-updated">Última atualização: 26 de outubro de 2026</p>
  <p>Esta Política explica como a Dra. Ana Paula Cruz trata os dados pessoais de quem acessa este site ou entra em contato para agendar uma consulta, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).</p>
  <h3>1. Quem é a controladora dos dados</h3>
  <p>Dra. Ana Paula Cruz, médica dermatologista, CRM-SP 169031, com consultório na Rua Bandeira Paulista, 530, 9º andar, Itaim Bibi, São Paulo — SP.</p>
  <h3>2. Quais dados coletamos</h3>
  <ul>
   <li><strong>Dados que você nos envia:</strong> nome, telefone e informações que você compartilhar ao entrar em contato pelo WhatsApp para agendamento ou dúvidas.</li>
   <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador e páginas acessadas, registrados pelo serviço de hospedagem para segurança e funcionamento do site.</li>
   <li><strong>Dados de uso (somente com consentimento):</strong> páginas visitadas, tempo de navegação, tipo de dispositivo e localização aproximada, coletados pelo Google Analytics de forma agregada para entendermos como o site é usado.</li>
   <li><strong>Cookies e armazenamento local:</strong> conforme descrito na seção 5.</li>
  </ul>
  <p>Este site não possui formulários e não coleta dados de saúde. Informações clínicas são tratadas apenas no atendimento, em prontuário médico, conforme as normas do Conselho Federal de Medicina.</p>
  <h3>3. Para que usamos os dados e com qual base legal</h3>
  <ul>
   <li>Responder contatos e agendar consultas — procedimentos preliminares a um contrato (art. 7º, V, da LGPD).</li>
   <li>Cumprir obrigações legais e regulatórias, como a guarda de prontuários (art. 7º, II, e art. 11, II, “a”).</li>
   <li>Prestar o atendimento em saúde (art. 11, II, “f”).</li>
   <li>Manter a segurança do site (legítimo interesse — art. 7º, IX).</li>
   <li>Medir o uso do site e melhorar seu conteúdo, com o Google Analytics (consentimento — art. 7º, I).</li>
   <li>Usar cookies opcionais, somente com o seu consentimento (art. 7º, I).</li>
  </ul>
  <h3>4. Com quem compartilhamos</h3>
  <p>Não vendemos nem alugamos dados pessoais. Os dados podem ser tratados por fornecedores que nos ajudam a operar o site e o atendimento, como o WhatsApp (Meta), o Google Analytics, o Google Maps e o serviço de hospedagem do site, além de autoridades públicas quando houver obrigação legal. Alguns desses fornecedores podem armazenar dados fora do Brasil, com as garantias previstas na LGPD.</p>
  <h3>5. Cookies</h3>
  <ul>
   <li><strong>Essenciais:</strong> guardam a sua escolha de cookies no próprio navegador. Não identificam você.</li>
   <li><strong>Estatísticas:</strong> o Google Analytics só é carregado se você permitir. Ele define cookies próprios (como _ga) para contar visitas de forma agregada. Se você retirar o consentimento, o Analytics deixa de ser carregado e esses cookies são apagados.</li>
   <li><strong>Mapas de terceiros:</strong> o mapa do Google Maps só é carregado se você permitir. Ao carregá-lo, o Google pode definir cookies próprios.</li>
  </ul>
  <p>Você pode alterar sua escolha a qualquer momento em <button type="button" className="text-link" onClick={()=>openLegal('cookies')}>Preferências de cookies</button> ou apagar os cookies nas configurações do seu navegador.</p>
  <h3>6. Por quanto tempo guardamos</h3>
  <p>Mantemos os dados pelo tempo necessário às finalidades acima. Prontuários médicos são guardados pelo prazo mínimo de 20 anos (Lei nº 13.787/2018). Mensagens de contato que não resultem em atendimento são descartadas quando deixarem de ser necessárias.</p>
  <h3>7. Segurança</h3>
  <p>Adotamos medidas técnicas e administrativas razoáveis para proteger os dados contra acessos não autorizados, perda ou uso indevido.</p>
  <h3>8. Seus direitos</h3>
  <p>Você pode, a qualquer momento, solicitar: confirmação de que tratamos seus dados; acesso; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade; informação sobre compartilhamento; e revogação do consentimento (art. 18 da LGPD). Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).</p>
  <h3>9. Como falar conosco</h3>
  <p>Para exercer seus direitos ou tirar dúvidas sobre esta Política, fale com a responsável pelo tratamento dos dados pelo WhatsApp <a href="https://wa.me/5511974540434" target="_blank" rel="noreferrer">(11) 97454-0434</a> ou no endereço do consultório.</p>
  <h3>10. Alterações</h3>
  <p>Esta Política pode ser atualizada. A data da última atualização fica indicada no início do texto.</p>
 </div>}</LegalDialog>;
}
function App(){const consent=useConsent();const [activeClinic,setActiveClinic]=useState(1);const [activeTreatment,setActiveTreatment]=useState(0);const treatmentScrollRef=useRef(null);const reviewScrollRef=useRef(null);useAutoAdvance(reviewScrollRef);useLayoutEffect(()=>{const rail=treatmentScrollRef.current;const update=()=>{rail.querySelectorAll('.treatment-info').forEach(info=>{const title=info.querySelector('h3');info.style.setProperty('--title-travel',`${Math.max(0,info.clientHeight-title.offsetHeight-44)}px`)})};const observer=new ResizeObserver(update);rail.querySelectorAll('.treatment-info,.treatment-info h3').forEach(el=>observer.observe(el));update();return()=>observer.disconnect()},[]);useLayoutEffect(()=>{const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduceMotion||!('IntersectionObserver'in window))return;const selectors=['.philosophy .section-heading','.principles .principle','.about .about-art','.about .about-copy','.image-interlude','.treatments .section-heading','.aging>img','.aging-copy','.reviews-heading>*','.reviews .review-card','.clinic-heading>*','.clinic-map','.footer-top','.footer-socials','.footer-wordmark'];const targets=[...document.querySelectorAll(selectors.join(','))];if(!targets.length)return;document.documentElement.dataset.motionReady='';const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.dataset.revealed='true';observer.unobserve(entry.target)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});targets.forEach(element=>{element.dataset.reveal='';const group=element.parentElement?.matches('.principles,.treatment-grid,.review-grid,.clinic-accordion');if(group){const index=Array.prototype.indexOf.call(element.parentElement.children,element);element.style.setProperty('--reveal-delay',`${Math.min(index,3)*45}ms`)}observer.observe(element)});return()=>{observer.disconnect();delete document.documentElement.dataset.motionReady}},[]);return <>
  <header className="hero" id="inicio">
   <div className="hero-photo" aria-hidden="true" style={{backgroundImage:`url(${asset(img.hero)})`}}/>
   <Navigation/>
   <div className="hero-content"><div className="eyebrow"><img src={asset(img.logo)} alt=""/><span>DERMATOLOGIA &amp; MEDICINA ESTÉTICA</span></div><h1>Rejuvenescimento e gerenciamento do envelhecimento com cuidado personalizado, naturalidade e respeito aos seus traços.</h1><div className="hero-actions"><WhatsApp icon="figma-55-4-imgBxlWhatsapp.svg"/><a className="button button-outline" href="#tratamentos">Conhecer os tratamentos</a></div></div>
  </header>
  <main>
   <section className="philosophy section" id="atuacao"><div className="section-heading"><h2>Cuidar da beleza é, antes de tudo, respeitar a individualidade.</h2><p>Acredito em uma estética que valoriza essas diferenças, buscando equilíbrio entre saúde, beleza e naturalidade. Mais do que modificar a aparência, meu compromisso é oferecer cuidados que respeitem suas características e contribuam para o seu bem-estar.</p></div><div className="principles">{principles.map(([t,d,icon],i)=><article className="principle" key={t}><div className="principle-top">{i<2?<img src={asset(i===0?'figma-55-50-imgGroup.svg':'figma-55-50-imgGroup1.svg')} alt=""/>:<div className="principle-leaf" aria-hidden="true">{['imgGroup2','imgGroup3','imgGroup4','imgGroup5','imgVector','imgGroup6'].map((name,index)=><img key={name} className={`leaf-layer leaf-layer-${index}`} src={asset(`figma-55-50-${name}.svg`)} alt=""/>)}</div>}</div><div><h3>{t}</h3><p>{d}</p></div></article>)}</div></section>
   <section className="about section" id="sobre"><div className="about-art"><img className="about-new-portrait" src={asset('about-figma-55-619.png')} alt="Retrato da Dra. Ana Cruz"/><div className="about-new-seal" aria-hidden="true"><img src={asset('about-seal-ring-55-619.svg')} alt=""/><img src={asset('about-seal-monogram-55-619.svg')} alt=""/></div></div><div className="about-copy"><div className="about-heading"><p className="kicker">SOBRE MIM</p><h2>Rejuvenescer com naturalidade. Valorizar o que faz você ser única.</h2></div><div className="about-body"><p>Sou a Dra. Ana Cruz, médica com foco em estética, rejuvenescimento e gerenciamento do envelhecimento. Meu propósito é ajudar você a se sentir mais bonita e confiante, respeitando seus traços, sua história e o momento que está vivendo.</p><p>Acredito que um bom resultado começa com uma escuta atenta e uma avaliação criteriosa. Por isso, cada plano de tratamento é individualizado: considero a saúde da pele, a estrutura do rosto e as mudanças que acontecem com o tempo, além do que incomoda você.</p><p>Meu trabalho combina conhecimento científico, tecnologias e procedimentos para prevenir e suavizar os sinais do envelhecimento, melhorar a qualidade da pele e valorizar sua beleza com equilíbrio e naturalidade.</p><p>Mais do que um procedimento pontual, acredito no cuidado contínuo, com indicações responsáveis e respeito a cada etapa da vida. Quero que você se olhe no espelho, se reconheça e se sinta bem com a própria imagem.</p></div></div></section>
   <section className="image-interlude" style={{backgroundImage:`linear-gradient(rgba(0,0,0,.15),rgba(0,0,0,.15)),url(${asset(img.nature)})`}} aria-label="Gerenciar o envelhecimento também é entender o momento certo de agir"><p>Gerenciar o envelhecimento também é entender o momento certo de agir.</p></section>
   <section className="treatments section" id="tratamentos"><div className="section-heading compact"><h2>Conheça os procedimentos do consultório</h2><div className="section-support"><p>Eu acredito em um envelhecimento bem conduzido: cuidar antes, preservar o que é bonito e tratar o que realmente incomoda.</p></div></div><div className="treatment-grid" ref={treatmentScrollRef} role="region" tabIndex={0} aria-label="Tratamentos. Role horizontalmente para ver todos.">{treatments.map(([title,desc,photo],i)=><button type="button" className={`treatment-card ${activeTreatment===i?'is-expanded':''}`} key={title} aria-expanded={activeTreatment===i} aria-controls={`treatment-description-${i}`} onClick={(event)=>{if(activeTreatment===i)return;const rail=treatmentScrollRef.current;const instant=event.detail===0||window.matchMedia('(prefers-reduced-motion: reduce)').matches;rail.dataset.instant=String(instant);setActiveTreatment(i);const closedWidth=window.innerWidth<=700?Math.min(window.innerWidth*.78,300):window.innerWidth<=1100?308:392;const gap=parseFloat(getComputedStyle(rail).columnGap)||16;requestAnimationFrame(()=>rail.scrollTo({left:i*(closedWidth+gap),behavior:instant?'instant':'smooth'}))}}><img className="treatment-image" loading={i>3?'lazy':'eager'} src={asset(photo)} alt=""/><div className="treatment-info"><h3>{title}</h3><p className="treatment-prompt" aria-hidden="true">Clique para saber mais</p><p className="treatment-description" id={`treatment-description-${i}`} aria-hidden={activeTreatment!==i}>{treatmentDetails[i]}</p></div></button>)}</div><div className="treatment-actions"><WhatsApp icon="figma-55-6458-imgBxlWhatsapp.svg"/><ScrollControls scrollerRef={treatmentScrollRef} label="tratamentos"/></div></section>
   <section className="aging section"><img loading="lazy" src={asset(img.aging)} alt="Dra. Ana Cruz durante atendimento no consultório"/><div className="aging-copy"><h2><span>O tempo transforma.</span><em>Sua essência permanece.</em></h2><div className="aging-body"><p>Gerenciar o envelhecimento é muito mais do que cuidar das rugas. É entender o que a sua pele precisa em cada fase e fazer escolhas que façam sentido a longo prazo.</p><p>E é por isso que conversar com seu dermatologista faz tanta diferença. Entender o que te incomoda, quais pontos você gostaria de melhorar e o que realmente faz sentido para o seu gerenciamento do envelhecimento.</p></div></div></section>
   <section className="reviews section" id="depoimentos"><div className="reviews-heading"><div><p className="kicker">DEPOIMENTOS</p><h2>Quem conhece confia no meu trabalho!</h2></div><div className="section-support"><p>Milhares de pacientes atendidos com cuidado humano e profissional.</p></div></div><div className="review-grid" ref={reviewScrollRef} role="region" aria-label="Depoimentos. Role horizontalmente para ver todos." tabIndex={0}>{reviews.map(({name,copy,initial,prefix,color})=><article className="review-card" key={name}><div className="review-user"><div className="review-avatar-wrap"><img className="review-profile-photo" src={asset(`${prefix}-imgImage7.png`)} alt=""/>{initial&&<span className="review-initial" style={{backgroundColor:color}}>{initial}</span>}<span className="review-google-badge"><img src={asset(`${prefix}-imgGroup1.svg`)} alt="Google"/></span></div><strong>{name}</strong></div><div className="review-rating" aria-label="5 de 5 estrelas">{Array.from({length:5},(_,n)=><span key={n}><img src={asset(`${prefix}-imgGroup4.svg`)} alt=""/></span>)}</div><p>{copy}</p></article>)}</div><div className="reviews-actions"><WhatsApp icon="figma-55-4-imgBxlWhatsapp.svg"/></div></section>
   <section className="clinic section" id="consultorio"><div className="clinic-heading"><div><p className="kicker">ENDEREÇO E ATENDIMENTO</p><h2>Localização do Consultório</h2></div><p>{clinicAddress.replace(', Itaim Bibi, São Paulo, SP',' Itaim Bibi.')}</p></div><div className="clinic-gallery"><div className="clinic-map">{consent?.maps?<iframe title="Mapa do Google Maps — Rua Bandeira Paulista, 530, Itaim Bibi" src={googleMapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>:<div className="map-placeholder"><p>O mapa é fornecido pelo Google Maps, que pode usar cookies.</p><button type="button" className="cookie-button cookie-primary" onClick={()=>consentStore.set({...(consent||{}),necessary:true,maps:true})}>Carregar mapa</button><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinicAddress)}`} target="_blank" rel="noreferrer">Abrir no Google Maps</a></div>}</div><div className="clinic-accordion" role="group" aria-label="Fotos do consultório — selecione uma para ampliar">{clinicSlides.map(([label,photo],index)=><button type="button" key={photo} className={`clinic-slide ${activeClinic===index?'is-active':''}`} aria-label={`${activeClinic===index?'Foto em destaque':'Ampliar foto'}: ${label}`} aria-expanded={activeClinic===index} onClick={()=>setActiveClinic(index)}><img loading="lazy" src={asset(photo)} alt=""/></button>)}</div></div><WhatsApp icon="figma-55-1218-imgBxlWhatsapp.svg"/></section>
  </main>
  <footer className="footer" id="contato"><img className="footer-background" src={asset('footer-background-figma-v2.png')} alt="" aria-hidden="true"/><div className="footer-inner"><div className="footer-top"><div className="footer-credentials"><p className="footer-specialty">Dermatologia &amp; Medicina Estética</p><p className="footer-crm">CRM-SP 169031</p></div><div className="footer-socials"><a className="social-link" href="https://www.instagram.com/draanacruz/" target="_blank" rel="noreferrer" aria-label="Instagram da Dra. Ana Cruz"><img src={asset('footer-instagram-figma.svg')} alt=""/></a></div></div><div className="footer-lower"><img className="footer-wordmark" src={asset('footer-wordmark-figma.svg')} alt="Dra. Ana Cruz"/><div className="footer-bottom"><div className="footer-legal-left"><span>© 2026 Todos os direitos reservados</span></div><div className="footer-legal-links"><button type="button" onClick={()=>openLegal('privacy')}>Política de Privacidade</button></div></div></div></div></footer>
  <CookieConsent/><PrivacyPolicy/><a href="https://wa.me/5511974540434" className="floating-whatsapp" aria-label="Agendar consulta pelo WhatsApp"><img src={asset(img.whatsapp)} alt=""/></a>
 </>}

createRoot(document.getElementById('root')).render(<App/>);
