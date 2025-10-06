CREATE TABLE public.sessoes (
    "Id" SERIAL PRIMARY KEY,
    "Capacidade" INTEGER NOT NULL,
    "NomeFilme" TEXT,
    "SessaoStatus" INTEGER NOT NULL,
    "DataHora" TIMESTAMP WITH TIME ZONE NOT NULL,
    "Sala" TEXT,
    "DuracaoMinutos" INTEGER NOT NULL
);

CREATE TABLE public.assentos_sessoes (
    "Id" SERIAL PRIMARY KEY,
    "Status" INTEGER NOT NULL,
    "SessaoId" INTEGER NOT NULL,
    "Numero" INTEGER NOT NULL,
    CONSTRAINT "FK_assentos_sessoes_sessoes_SessaoId"
    FOREIGN KEY ("SessaoId") REFERENCES public.sessoes("Id") ON DELETE CASCADE
);
